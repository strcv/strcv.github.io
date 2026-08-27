// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// site — адрес публикации; из него собираются канонические ссылки и sitemap.
// Сайт заливается в strcv/strcv.github.io (см. .github/workflows/personal.yml), а это
// пользовательский репозиторий Pages, поэтому адрес корневой и base не нужен. Появится
// свой домен — меняется только эта строка.
export default defineConfig({
  site: 'https://strcv.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
