import { memo } from '@chocolab/functional'

const langKey = '__I18N_LANG__'

/**
 * Get key.
 * @param key - Name of translation.
 * @param lang - Language of translation.
 * @returns Key.
 */
function valueKey(key: string, lang?: string): string {
  const locale = lang || getLang()
  return `__${locale}_${key}__`
}

type Cache = {
  readonly [key: string]: Record<string, unknown>
}

// const cache: I18nDictionary = {}

type I18nValue = string | {
  readonly [key: string]: string | I18nValue
}

// /**
//  * @constant
//  * @default
//  */
// const en = 'en'
// let locale = window && window.navigator ? window.navigator.language.substr(0, 2) : en

type I18nDictionary = {
  readonly [key: string]: I18nValue
}

/**
 * Get manually the locales.
 * @example
 * ```
 * locale.getLang()
 * ```
 * @returns Locale.
 */
export function getLang(): string {
  return memo<string>(langKey) || 'en'
}

/**
 * Set manually the locales.
 * @param {string} lang -  Short locale.
 * @example
 * locale.setLang('en')
 */
export function setLang(lang: string): void {
  memo<string>(langKey, lang)
}

// /**
//  * Get all locales.
// //  * @example
//  * locale.all() // returns { ... }
//  * @returns {object.<string, any>} All locales.
//  */
// export function all(): I18nDictionary | undefined {
//   return cache[locale] || {}
// }

/**
 * Get one locales.
 * @example
 * locale.one('dog') // returns VALUE
 * @returns {string|undefined} One locales.
 */
export function one<Type>(key: string): Type {
  return memo<Type>(valueKey(key))
}

/**
 * Set a locale key.
 * @example
 * locale.set('en', 'dog', 'potato')
 * @param {string} lang - Short locale.
 * @param {string} key - Name of translation.
 * @param {any} value - Value of translation.
 */
export function set<Type>(lang: string, key: string, value?: Type): void {
  memo(valueKey(key, lang), value)
}

// export default { one, all, set, getLang, setLang }
export default { one, set, getLang, setLang }
