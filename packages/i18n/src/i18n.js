"use strict";
exports.__esModule = true;
exports.set = exports.one = exports.all = exports.setLang = exports.getLang = void 0;
var cache = {};
/** @module @choco/i18n */
/**
 * @constant
 * @default
 */
var en = 'en';
var locale = window && window.navigator ? window.navigator.language.substr(0, 2) : en;
/**
 * Get manually the locales.
 *
 * @example
 * locale.getLang()
 * @returns {string} Locale.
 */
function getLang() {
    return locale;
}
exports.getLang = getLang;
/**
 * Set manually the locales.
 *
 * @param {string} lang -  Short locale.
 * @example
 * locale.setLang('en')
 */
function setLang(lang) {
    locale = lang;
}
exports.setLang = setLang;
/**
 * Get all locales.
 *
 * @example
 * locale.all() // returns { ... }
 * @returns {object.<string, any>} All locales.
 */
function all() {
    return cache[locale] || {};
}
exports.all = all;
/**
 * Get one locales.
 *
 * @example
 * locale.one('dog') // returns VALUE
 * @returns {string|undefined} One locales.
 */
function one(key) {
    // if (!cache[locale])
    if (cache[locale])
        return cache[locale][key];
}
exports.one = one;
/**
 * Set a locale key.
 *
 * @example
 * locale.set('en', 'dog', 'potato')
 * @param {string} lang - Short locale.
 * @param {string} key - Name of translation.
 * @param {any} value - Value of translation.
 */
function set(lang, key, value) {
    if (!cache[lang])
        cache[lang] = {};
    cache[lang][key] = value;
}
exports.set = set;
exports["default"] = { one: one, all: all, set: set, getLang: getLang, setLang: setLang };
