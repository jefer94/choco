const cache = {}

/** @module @choco/i18n */

type I18nValue = string | {
  readonly [key: string]: string | I18nValue
}

/**
 * @constant
 * @default
 */
const en = 'en'
let locale = window && window.navigator ? window.navigator.language.substr(0, 2) : en

type I18nDictionary = {
  readonly [key: string]: I18nValue
}

/**
 * Get manually the locales.
 *
 * @example
 * locale.getLang()
 * @returns {string} Locale.
 */
export function getLang(): string {
  return locale
}

/**
 * Set manually the locales.
 *
 * @param {string} lang -  Short locale.
 * @example
 * locale.setLang('en')
 */
export function setLang(lang: string): void {
  locale = lang
}

/**
 * Get all locales.
 *
 * @example
 * locale.all() // returns { ... }
 * @returns {object.<string, any>} All locales.
 */
export function all(): I18nDictionary | undefined {
  return cache[locale] || {}
}

/**
 * Get one locales.
 *
 * @example
 * locale.one('dog') // returns VALUE
 * @returns {string|undefined} One locales.
 */
export function one<Type>(key: string): Type {
  // if (!cache[locale])
  if (cache[locale]) return cache[locale][key]
}

/**
 * Set a locale key.
 *
 * @example
 * locale.set('en', 'dog', 'potato')
 * @param {string} lang - Short locale.
 * @param {string} key - Name of translation.
 * @param {any} value - Value of translation.
 */
export function set<Type>(lang: string, key: string, value: Type): void {
  if (!cache[lang]) cache[lang] = {}
  cache[lang][key] = value
}

export default { one, all, set, getLang, setLang }
