define(['exports'], function (exports) { 'use strict';

  /**
   * Get CSS variable.
   *
   * @param {string} key - Key of CSS variable.
   * @param {boolean} camelCaseMode - Selector in camel case format.
   */
  function getVar(key, camelCaseMode) {
    const selector = camelCaseMode ? camelCaseToCssVariable(key) : key;
    return getComputedStyle(document.documentElement).getPropertyValue(selector);
  }
  /**
   * Set CSS variable.
   *
   * @param {string} key - Key of CSS variable.
   * @param {string} value - Value of CSS variable.
   * @param {boolean} camelCaseMode - Selector in camel case format.
   */

  function setVar(key, value, camelCaseMode) {
    const selector = camelCaseMode ? camelCaseToCssVariable(key) : key;
    document.documentElement.style.setProperty(selector, value);
  }
  /**
   * Transform camel case selector to CSS selector.
   *
   * @param {string} s - Selector in camel case format.
   */

  function camelCaseToCssVariable(s) {
    return `-${s.replace(/([A-Z])/g, v => `-${v.toLowerCase()}`)}`;
  }

  exports.camelCaseToCssVariable = camelCaseToCssVariable;
  exports.getVar = getVar;
  exports.setVar = setVar;

  Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=css-utils.amd.js.map
