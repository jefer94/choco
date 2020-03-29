'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const cache = {};

/** @module @choco/i18n */

/** @todo strategy to load locale */
// const locale = window ? window.navigator.language.substr(0, 2) : 'en'
const EN = 'es';
const locale = EN;

function setLang(langArg) {
  
}

/**
 * Get all locales.
 * 
 * @example
 * import locale from '@choco/i18n'
 * locale.all() // returns { ... }
 * @returns {Object.<string, any>} All locales.
 */
function all() {
  console.log('all', cache, cache[locale]);
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
function one(key) {
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
function set(lang, key, value) {
  if (!cache[lang]) cache[lang] = {};
  cache[lang][key] = value;
}

var index = { one, all, set, setLang };

exports.all = all;
exports.default = index;
exports.one = one;
exports.set = set;
exports.setLang = setLang;
