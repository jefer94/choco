const cache = {}

/** @module @choco/i18n */

/** @todo strategy to load locale */
// const locale = window ? window.navigator.language.substr(0, 2) : 'en'
const EN = 'es'
const locale = EN

export function setLang(langArg) {
  
}

/**
 * Get all locales.
 * 
 * @example
 * import locale from '@choco/i18n'
 * locale.all() // returns { ... }
 * @returns {Object.<string, any>} All locales.
 */
export function all() {
  console.log('all', cache, cache[locale])
  return cache[locale] ? cache[locale] : cache[EN]
}

/**
 * Get one locales.
 * 
 * @example
 * import locale from '@choco/i18n'
 * locale.one('dog') // returns VALUE
 * @returns {any} One locales.
 */
export function one(key) {
  return cache[locale] ? cache[locale][key] : cache[EN][key]
}

/**
 * Set a locale key.
 *
 * @example
 * import locale from '@choco/i18n'
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