import { site, emailHref } from '../site.config'
import type { Dict } from './types'

// Английский написан заново, а не переведён дословно (docs/tz.md, раздел 3).
// Тон тот же: короткие утверждения, цифры, ноль маркетингового пафоса.
// Раздел 05 звучит так же жёстко, как по-русски, — в этом его смысл.

export const en: Dict = {
  lang: 'en',
  base: '/en',
  dir: 'ltr',

  meta: {
    title: 'Alexander Startsev — CRM and retention for crypto and fintech',
    description:
      'I turn the users you already have into revenue. CRM and retention for crypto and fintech products. In marketing since 2016, in Web3 since 2019. Currently CRM & Retention Marketing Lead at EMCD.',
    ogAlt: 'Alexander Startsev — I turn the users you already have into revenue',
  },

  skipToContent: 'Skip to content',

  nav: {
    home: 'Alexander Startsev',
    write: 'Email me',
    langLabel: 'Page language',
    menuLabel: 'Site sections',
    // Раздел /watch-later только на русском, и это не временно: в английском меню его нет.
    menu: [],
  },

  hero: {
    name: 'Alexander Startsev',
    headline: 'I turn the users you already have into revenue.',
    lead: 'CRM and retention for crypto and fintech products. In marketing since 2016, in Web3 since 2019. Currently CRM & Retention Marketing Lead at EMCD.',
    actions: [
      { label: 'Email me', href: emailHref },
      { label: 'Telegram', href: site.telegram, external: true },
      { label: 'LinkedIn', href: site.linkedin, external: true },
    ],
  },

  stats: {
    n: '02',
    title: 'Numbers',
    items: [
      { value: '$10M+', label: 'in staking deposits at Nominex from an existing user base' },
      { value: '500,000', label: 'contacts in the base I worked with' },
      { value: '300+', label: 'automated campaigns and 1,000+ broadcasts in one year' },
      { value: '120+', label: 'events and 100+ attributes used for segmentation' },
      { value: '10+', label: 'integrations: APIs, webhooks, Make.com' },
      { value: 'Since 2016', label: 'in marketing; in Web3 since 2019' },
    ],
    note: 'Numbers come from my most recent roles.',
  },

  skills: {
    n: '03',
    title: 'What I do',
    items: [
      {
        title: 'CRM and retention',
        body: 'I build the communication system from scratch: segmentation, triggered flows, email, push, in-app, SMS, Intercom. Not "set up a newsletter" — wiring marketing into the product, analytics and content so the base earns again.',
      },
      {
        title: 'Web3: growth, sales, partnerships',
        body: 'In crypto since 2019 — an exchange, an OTC platform, an international crypto publication, a mining ecosystem. B2B sales, business development, work with funds, angels, incubators and grant programmes. Testnets, ambassador programmes, contests and activations. I have been through trading, farming, staking, nodes and sales myself — I speak the product’s language.',
      },
      {
        title: 'AI in marketing production',
        body: 'Claude and ChatGPT are built into the workflow: copy, design, code, automation. This is not an experiment — 300+ campaigns over the past year were made this way.',
      },
    ],
  },

  principles: {
    n: '04',
    title: 'How I work',
    items: [
      {
        title: 'Fewer approvals, more ownership.',
        body: 'I take the decision and answer for the result. That is faster than a week of email with three departments, and fairer to everyone involved.',
      },
      {
        title: 'I do not take on boring work.',
        body: 'If a job offers neither enjoyment nor new experience, it will not be done well. Not by me, not by anyone.',
      },
      {
        title: 'Directness and attention.',
        body: 'Almost all my mistakes came from carelessness, and from not saying something out loud in time — not from not knowing. Now I say it immediately and check the details.',
      },
      {
        title: 'A call first, text after.',
        body: 'Personal contact before tasks. Fifteen minutes by voice save a week of messages.',
      },
      {
        title: 'I need access and the truth.',
        body: 'Goals, numbers, access to the base — and an honest answer about what actually is not working. Without that I am not working, I am guessing.',
      },
      {
        title: 'The long game.',
        body: 'I have left the idea of quick money behind. I want to build things that outlast me, and to keep learning in practice while I build. Hence the perfectionism: precise actions, quality throughout, attention to detail.',
      },
    ],
  },

  fit: {
    n: '05',
    title: 'Who I work well with',
    goodTitle: 'We will get on if',
    badTitle: 'Not a fit if',
    good: [
      'the company measures effectiveness and looks at the numbers',
      'it invests in growth instead of only squeezing what already exists',
      'the subject is interesting in itself, not only profitable',
      'you can speak plainly — and it gets heard',
      'you get access, context and goals without twisting arms',
    ],
    bad: [
      'you need "someone to send newsletters"',
      'money is the only motivation and the product does not matter',
      'the scheme involves deceiving users — for me that is a matter of conscience',
      'decisions are made by taste rather than by data',
      'creative work is treated as an unnecessary expense',
    ],
  },

  services: {
    n: '06',
    title: 'Working with me',
    lead: 'Alongside my main job I take on outside work — where an outside view is needed, and where the experience is expensive to build yourself.',
    items: [
      {
        title: 'Consultation.',
        body: 'We go through your product, your base and your communications. You leave with what to do first, and what not to do at all.',
      },
      {
        title: 'Go-to-market strategy.',
        body: 'For crypto and fintech products: positioning, channels, partnerships, launch sequence.',
      },
      {
        title: 'Campaign and CJM design.',
        body: 'User journey map, segments, flows, events and attributes — taken to the point where it can be handed over for execution.',
      },
      {
        title: 'Mentoring and advisory.',
        body: 'Regular work with a team or a founder: reviewing decisions, help with hypotheses, access to an industry network.',
      },
    ],
    cta: { label: 'Discuss a task', href: site.telegram, external: true },
  },

  cases: {
    n: '07',
    title: 'Cases',
    items: [
      {
        slug: 'depozity-iz-bazy',
        title: '$10M in staking deposits at Nominex',
        meta: 'Nominex · staking',
        summary:
          'Segmentation across 100+ attributes and 120+ events, triggered flows, multichannel communication — email, push, in-app, SMS, Intercom.',
      },
      {
        slug: 'marsbase-otc',
        title: 'Launching an OTC product from zero',
        meta: 'Marsbase, 2021–2022, CMO',
        summary:
          'Marketing, community, content, influencers, testnet, user activations. Team: marketer, community and support managers, copywriter, designer.',
      },
      {
        slug: 'beincrypto-b2b',
        title: 'B2B sales at an international crypto publication',
        meta: 'BeInCrypto, 2021',
        summary:
          'Introduced HubSpot, built the funnel structure, KPIs and reporting for the sales team; put together dashboards and working materials.',
      },
    ],
    more: 'Read the case',
    back: 'All cases',
  },

  experience: {
    n: '08',
    title: 'Experience',
    rows: [
      { period: '02.2024 — present', company: 'EMCD', role: 'CRM & Retention Marketing Lead' },
      { period: '2021 — 2022', company: 'Marsbase (OTC)', role: 'CMO' },
      { period: '2021', company: 'BeInCrypto', role: 'CRM and B2B Sales, consultant' },
      { period: '2020 — 2021', company: 'Nominex', role: 'Retention / CRM' },
      { period: '2019 — 2020', company: 'Twino · eZaem', role: 'Head of CRM' },
      { period: '2018 — 2019', company: 'Convead', role: 'Email marketer, product' },
      { period: '2016 — 2018', company: 'Qmarketing', role: 'Email marketer' },
    ],
    education: 'Lomonosov Moscow State University, political science, 2015 · English C1',
    links: [
      { label: 'Full CV in Notion', href: site.cv, external: true },
      { label: 'Portfolio in Figma', href: site.portfolio, external: true },
    ],
    colPeriod: 'Period',
    colCompany: 'Company',
    colRole: 'Role',
  },

  pets: {
    n: '09',
    title: 'Side projects',
    lead: 'Besides work I build my own things. Usually out of irritation: I did something by hand for too long, which means it needs automating.',
    items: [
      {
        title: 'ASAP Mail',
        body: 'A service that assembles HTML emails to a company’s brand book. In: a brief, a website, or past campaigns. Out: an email that passes the linter and does not fall apart in Outlook or in dark mode. I build it because I spent nine years laying out and fixing emails by hand.',
      },
    ],
  },

  contacts: {
    n: '10',
    title: 'Contacts',
    lead: 'Write if you have a product with a base that needs to start working. Or if you need a review, a strategy, or a mentor.',
    items: [
      { label: 'Telegram', href: site.telegram, note: 'fastest reply', external: true },
      { label: 'Email', href: emailHref, note: site.email },
      { label: 'LinkedIn', href: site.linkedin, external: true },
    ],
  },

  footer: {
    note: 'Alexander Startsev',
  },

  notFound: {
    title: 'No such page',
    body: 'The address does not exist, or the page has moved.',
    back: 'Go to the homepage',
  },
}
