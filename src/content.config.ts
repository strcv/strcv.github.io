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

export const collections = { cases }
