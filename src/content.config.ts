import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

// Кейсы — парные файлы: src/content/cases/<язык>/<адрес>.md.
// Идентификатор записи получается вида 'ru/marsbase-otc', по нему и разбираем язык.
const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Компания и период. Иногда это ещё заглушка вида «[уточнить: …]». */
    meta: z.string().optional(),
    order: z.number().default(100),
  }),
})

// Видео раздела /video/ — по файлу на ролик: src/content/videos/<slug>.json.
// Файлы пишет внешняя автоматизация, поэтому схема строгая: битое, пустое или лишнее
// поле роняет сборку с именем файла и поля, а не уезжает на сайт кривой страницей.

/** Закрытый список. Новый тег появляется только здесь — вместе с правкой конвейера. */
const TAGS = [
  'AI',
  'агенты',
  'разработка',
  'продукт',
  'стартапы',
  'деньги',
  'интервью',
  'туториал',
] as const

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const text = z.string().trim().min(1, 'пустая строка')
const https = z.string().url().startsWith('https://', 'нужна ссылка https://')
// В файле дата строкой, в шаблонах — Date. z.coerce.date() не годится: он молча
// превращает null в 1970-01-01.
const day = z
  .string()
  .date('дата в формате ГГГГ-ММ-ДД')
  .transform((s) => new Date(s))

const videos = defineCollection({
  loader: glob({
    base: './src/content/videos',
    pattern: '**/*.json',
    // Адрес разбора — имя файла как есть. Штатный загрузчик молча переделал бы
    // «Foo Bar.json» в foo-bar, и ссылки, которые автоматизация собирает по имени
    // файла, разошлись бы с сайтом.
    generateId: ({ entry }) => {
      const slug = entry.replace(/\.json$/, '')
      if (!SLUG.test(slug)) {
        throw new Error(
          `videos: файл «${entry}» — имя должно быть адресом: латиница в нижнем регистре, цифры и дефисы, без подпапок`,
        )
      }
      return slug
    },
  }),
  schema: z
    .object({
      title: text,
      summary: text,
      channel: text,
      /** Секунды. */
      duration: z.number().positive(),
      url: https,
      /** ID ролика на YouTube. У роликов с других площадок — null. */
      videoId: z
        .string()
        .regex(/^[\w-]{11}$/, 'ID ролика на YouTube — 11 символов')
        .nullable(),
      /**
       * Своя обложка: https:// или путь от корня сайта. Задана — берётся она, нет —
       * кадр с YouTube по videoId, нет и его — заглушка. Нужна роликам не с YouTube.
       */
      thumb: z
        .string()
        .regex(/^(?:https:\/\/|\/(?!\/))\S+$/, 'ссылка https:// или путь от корня сайта: /…')
        .nullable()
        .default(null),
      /** Когда ролик попал в очередь; по этой дате сортируется список. */
      added: day,
      published: day,
      lang: text,
      takeaways: z.array(text),
      /** t — секунда от начала ролика. */
      timecodes: z.array(z.object({ t: z.number().nonnegative(), label: text }).strict()),
      tags: z
        .array(z.enum(TAGS))
        .min(1, 'нужен хотя бы один тег')
        .max(2, 'не больше двух тегов')
        .refine((tags) => new Set(tags).size === tags.length, 'теги повторяются'),
      /** Путь к расшифровке в public/: '/video/transcripts/<slug>.md'. */
      transcript: z
        .string()
        .regex(/^\/video\/transcripts\/[a-z0-9-]+\.md$/, 'путь вида /video/transcripts/<slug>.md')
        .nullable(),
      /** Пост в Telegram-канале. Появляется после публикации, поэтому поле необязательное. */
      tgPost: https.nullable().default(null),
    })
    .strict()
    .superRefine(({ duration, timecodes }, ctx) => {
      timecodes.forEach(({ t }, i) => {
        if (t > duration) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['timecodes', i, 't'],
            message: `метка ${t} с позже конца ролика (${duration} с)`,
          })
        }
      })
    }),
})

export const collections = { cases, videos }
