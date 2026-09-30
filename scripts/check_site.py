"""Validate the built site: links, assets, metadata and publication placeholders."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
import re
import xml.etree.ElementTree as ET

ROOT = Path('dist')
ORIGIN = 'https://strcv.github.io'


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.refs, self.alternates = path, set(), [], {}
        self.lang, self.title, self.description, self.canonical = '', '', '', ''
        self.h1, self.in_title, self.text, self.noindex = 0, False, [], False
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            assert a['id'] not in self.ids, f'{self.path}: duplicate id {a["id"]}'
            self.ids.add(a['id'])
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'h1': self.h1 += 1
        if tag == 'main': assert a.get('tabindex') == '-1', f'{self.path}: skip target must accept focus'
        if tag == 'title': self.in_title = True
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content', '')
        if tag == 'meta' and a.get('name') == 'robots': self.noindex = 'noindex' in a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'link' and a.get('rel') == 'alternate': self.alternates[a['hreflang']] = a['href']
        if tag == 'a' and a.get('target') == '_blank':
            assert 'noopener' in a.get('rel', ''), f'{self.path}: unsafe new tab'
        for attr in ('href', 'src'):
            if a.get(attr): self.refs.append(a[attr])
        if tag == 'meta' and a.get('property') == 'og:image': self.refs.append(a['content'])

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False

    def handle_data(self, text):
        if self.in_title: self.title += text
        self.text.append(text)


def resolve(url):
    path = ROOT / unquote(urlparse(url).path).lstrip('/')
    if path.is_dir(): path /= 'index.html'
    return path


pages = {p: Page(p) for p in ROOT.rglob('*.html')}
assert pages, 'Build the site first'
titles, descriptions = set(), set()
for path, page in pages.items():
    assert page.lang in ('ru', 'en'), f'{path}: missing language'
    assert page.h1 == 1, f'{path}: expected one h1'
    assert page.title and page.title not in titles, f'{path}: missing/duplicate title'
    assert page.description and page.description not in descriptions, f'{path}: missing/duplicate description'
    titles.add(page.title); descriptions.add(page.description)
    assert page.canonical.startswith(ORIGIN + '/'), f'{path}: wrong canonical origin'
    assert resolve(page.canonical) == path, f'{path}: canonical points elsewhere'
    assert not re.search(r'\[(?:ссылка|уточнить|цифр|link|to confirm|no numbers|Telegram link)', ' '.join(page.text), re.I), f'{path}: editorial placeholder'
    for ref in page.refs:
        url = urlparse(urljoin(page.canonical, ref))
        if url.scheme not in ('http', 'https') or url.netloc != 'strcv.github.io': continue
        target = resolve(url.geturl())
        assert target.is_file(), f'{path}: broken reference {ref}'
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f'{path}: broken anchor {ref}'
    for lang, ref in page.alternates.items():
        alternate = pages[resolve(ref)]
        assert alternate.alternates.get(page.lang) == page.canonical, f'{path}: nonreciprocal language link'
        if lang != 'x-default': assert alternate.lang == lang, f'{path}: wrong language alternative'
    if '/watch-later/' in page.canonical: assert not page.alternates, 'Watch Later is Russian only'

ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = set()
for sitemap in ROOT.glob('sitemap-*.xml'):
    tree = ET.parse(sitemap)
    if tree.getroot().tag.endswith('urlset'):
        urls.update(n.text for n in tree.findall('s:url/s:loc', ns))
for page in pages.values():
    assert (page.canonical in urls) != page.noindex, f'{page.path}: incorrect sitemap inclusion'
assert 'Sitemap: ' + ORIGIN + '/sitemap-index.xml' in (ROOT / 'robots.txt').read_text()
print(f'PASS: {len(pages)} pages; internal links, anchors, assets, metadata, language pairs, sitemap and placeholders')
