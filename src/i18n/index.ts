import { en } from './en'
import { ru } from './ru'
import type { Dict } from './types'

export type { Dict, Link, NavItem, Stat, Titled, ExperienceRow, CaseTeaser } from './types'

export const languages = ['ru', 'en'] as const
export type Lang = (typeof languages)[number]

export const dicts: Record<Lang, Dict> = { ru, en }

export const defaultLang: Lang = 'ru'

export function otherLang(lang: Lang): Lang {
  return lang === 'ru' ? 'en' : 'ru'
}

/**
 * Адрес страницы на нужном языке. Принимает нейтральный путь — тот, что без
 * языкового префикса: '/' или '/cases/marsbase-otc/'.
 */
export function localePath(neutralPath: string, lang: Lang): string {
  const path = neutralPath.startsWith('/') ? neutralPath : `/${neutralPath}`
  if (lang === defaultLang) return path
  return path === '/' ? '/en/' : `/en${path}`
}
