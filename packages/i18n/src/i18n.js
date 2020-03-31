const cache = {}

/** @module @choco/i18n */

/**
 * @constant
 * @default
 */
const en = 'es'
let locale = en

try {
  locale = window ? window.navigator.language.substr(0, 2) : en
}
catch(e) {
  /** @todo server rendering support */
}

/**
 * Set manually the locales.
 *
 * @param {string} lang -  Short locale.
 * @example
 * import locale from '@choco/i18n'
 *
 * locale.setLang('en')
 */
export function setLang(lang) {
  locale = lang
}

/**
 * Get all locales.
 * 
 * @example
 * import locale from '@choco/i18n'
 *
 * locale.all() // returns { ... }
 * @returns {Object.<string, any>} All locales.
 */
export function all() {
  return (cache[locale] ? cache[locale] : cache[en]) || {}
}

/**
 * Get one locales.
 * 
 * @example
 * import locale from '@choco/i18n'
 *
 * locale.one('dog') // returns VALUE
 * @returns {any} One locales.
 */
export function one(key) {
  // if (!cache[locale]) 
  console.log(cache)
  return cache[locale] ? cache[locale][key] : cache[en][key]
}

/**
 * Set a locale key.
 *
 * @example
 * import locale from '@choco/i18n'
 *
 * locale.set('en', 'dog', 'potato')
 * @param {string} lang - Short locale.
 * @param {string} key - Name of translation.
 * @param {any} value - Value of translation
 */
export function set(lang, key, value) {
  if (!cache[lang]) cache[lang] = {}
  cache[lang][key] = value
}

export default { one, all, set, setLang }