const cache = {};
/** @module @choco/i18n */

/**
 * @constant
 * @default
 */

const en = 'es';
let locale = en;

try {
  locale = window ? window.navigator.language.substr(0, 2) : en;
} catch (e) {}
/** @todo server rendering support */

/**
 * Set manually the locales.
 *
 * @param {string} lang -  Short locale.
 * @example
 * import locale from '@choco/i18n'
 *
 * locale.setLang('en')
 */


function setLang(lang) {
  locale = lang;
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

function all() {
  return cache[locale] ? cache[locale] : cache[en];
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

function one(key) {
  return cache[locale] ? cache[locale][key] : cache[en][key];
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

function set(lang, key, value) {
  if (!cache[lang]) cache[lang] = {};
  cache[lang][key] = value;
}
var index = {
  one,
  all,
  set,
  setLang
};

export default index;
export { all, one, set, setLang };
//# sourceMappingURL=i18n.esm.js.map
