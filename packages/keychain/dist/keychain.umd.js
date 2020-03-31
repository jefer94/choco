(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['@choco/keychain'] = factory());
}(this, (function () { 'use strict';

  /** @module libs/keychain */

  /**
   * Acumulators by key.
   *
   * @constant {string}
   * @default
   */
  const cache = {};
  /**
   * Get a unique React key
   * @param {string} key - Namespace of counter
   * @return {string} Unique React key
   */

  function index (key) {
    if (Number.isInteger(cache[key])) cache[key] += 1;else cache[key] = 0;
    return `${key}_${cache[key]}`;
  }

  return index;

})));
//# sourceMappingURL=keychain.umd.js.map
