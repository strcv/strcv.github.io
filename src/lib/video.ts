// Форматирование для раздела /video/.

const MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

const pad = (n: number) => String(n).padStart(2, '0')

/** Секунды в «46:00» или «1:02:05». */
export function formatDuration(seconds: number): string {
  const s = Math.round(seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${m}:${pad(s % 60)}`
}

// Даты в данных — полночь UTC. Читаем их через getUTC*, иначе на машине западнее
// Гринвича «12 сен» превратится в «11 сен».

/** «12 сен 2026». */
export function formatDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

/** Для <time datetime>: «2026-09-12». */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/**
 * Обложка ролика: своя из записи, иначе кадр с YouTube по videoId, иначе null — тогда
 * рисуется заглушка. Кадра mqdefault (320×180) хватает строке списка. Для большой
 * обложки берём hqdefault: он 480×360 с чёрными полями, которые object-fit: cover
 * срезает ровно до 16:9.
 */
export function coverUrl(
  thumb: string | null,
  videoId: string | null,
  size: 'mq' | 'hq' = 'mq',
): string | null {
  if (thumb) return thumb
  return videoId ? `https://i.ytimg.com/vi/${videoId}/${size}default.jpg` : null
}

/** Где лежит оригинал, для подписей «Смотреть на …»: «YouTube» или домен без www. */
export function platform(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, '')
  return /^(?:.+\.)?youtube\.com$|^youtu\.be$/.test(host) ? 'YouTube' : host
}

/** Ссылка на ролик с нужной секунды: …/watch?v=…&t=640. */
export function watchAt(url: string, seconds: number): string {
  const u = new URL(url)
  u.searchParams.set('t', String(Math.round(seconds)))
  return u.href
}
