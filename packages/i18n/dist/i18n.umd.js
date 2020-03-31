(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['@choco/i18n'] = {}));
}(this, (function (exports) { 'use strict';

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
    return (cache[locale] ? cache[locale] : cache[en]) || {};
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
    // if (!cache[locale]) 
    console.log(cache);
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
  var i18n = {
    one,
    all,
    set,
    setLang
  };

  exports.all = all;
  exports.default = i18n;
  exports.one = one;
  exports.set = set;
  exports.setLang = setLang;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=i18n.umd.js.map
