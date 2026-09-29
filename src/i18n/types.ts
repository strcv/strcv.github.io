// Тип словаря один на оба языка: если в en.ts не хватит ключа или появится лишний,
// это упадёт на `pnpm typecheck`, а не тихо уедет в продакшн полупустой страницей.

/** Ссылка. Пока адрес не подтверждён, href = null и ссылка не публикуется. */
export interface Link {
  label: string
  href: string | null
  /** Приписка рядом со ссылкой: «отвечаю быстрее всего». */
  note?: string
  external?: boolean
}

export interface Stat {
  value: string
  label: string
}

export interface Titled {
  title: string
  body: string
}

export interface ExperienceRow {
  period: string
  company: string
  role: string
}

/** Пункт меню в шапке. Путь нейтральный — без языкового префикса: '/watch-later/'. */
export interface NavItem {
  label: string
  path: string
}

export interface CaseTeaser {
  slug: string
  title: string
  /** Компания и период, если известны. */
  meta?: string
  summary: string
}

export interface Dict {
  lang: 'ru' | 'en'
  /** Префикс маршрутов: '' для русского, '/en' для английского. */
  base: '' | '/en'
  dir: 'ltr'

  meta: {
    title: string
    description: string
    ogAlt: string
  }

  skipToContent: string

  nav: {
    home: string
    write: string
    langLabel: string
    menuLabel: string
    /** Меню у каждого языка своё: раздела может не быть в переводе. Пустое — меню нет. */
    menu: NavItem[]
  }

  hero: {
    name: string
    headline: string
    lead: string
    actions: Link[]
  }

  stats: {
    n: string
    title: string
    items: Stat[]
    note: string
  }

  skills: {
    n: string
    title: string
    items: Titled[]
  }

  principles: {
    n: string
    title: string
    items: Titled[]
  }

  fit: {
    n: string
    title: string
    goodTitle: string
    badTitle: string
    good: string[]
    bad: string[]
  }

  services: {
    n: string
    title: string
    lead: string
    items: Titled[]
    cta: Link
  }

  cases: {
    n: string
    title: string
    items: CaseTeaser[]
    more: string
    back: string
  }

  experience: {
    n: string
    title: string
    rows: ExperienceRow[]
    education: string
    links: Link[]
    /** Заголовки колонок для скринридера. */
    colPeriod: string
    colCompany: string
    colRole: string
  }

  pets: {
    n: string
    title: string
    lead: string
    items: Titled[]
  }

  contacts: {
    n: string
    title: string
    lead: string
    items: Link[]
  }

  footer: {
    note: string
  }

  notFound: {
    title: string
    body: string
    back: string
  }
}
