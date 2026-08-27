// Единственное место, где лежат личные данные.
// Правь здесь — страницы подтянут сами.

export const site = {
  name: 'Александр',
  // Фамилию/ник подставь свои
  handle: 'aleksandr',
  title: 'Александр — разработчик',
  tagline: 'Строю ASAP Mail — сервис вёрстки email-писем.',
  bio: [
    'Разработчик и предприниматель. Делаю продукты, которые убирают ручную работу: сейчас — ASAP Mail, сервис, который собирает письма по брендбуку вместо человека.',
    'До этого — свой IT-бизнес и удалённая разработка. Работаю с TypeScript: Fastify, Next.js, Postgres, очереди.',
  ],
  location: 'Испания',
  email: 'theasapmail@gmail.com',
  // Ссылки: убери лишние, добавь свои
  links: [
    { label: 'GitHub', href: 'https://github.com/theasapmail' },
    { label: 'ASAP Mail', href: 'https://asapmail.com' },
    { label: 'Email', href: 'mailto:theasapmail@gmail.com' },
  ],
  // Чем занимаюсь прямо сейчас — короткий блок, обновляй раз в месяц
  now: [
    'Пишу платформенный слой ASAP Mail: авторизация, воркспейсы, телеметрия.',
    'Собираю базу знаний по вёрстке email-HTML.',
  ],
} as const;

export type SiteConfig = typeof site;
