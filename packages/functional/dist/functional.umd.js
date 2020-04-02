(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['@choco/functional'] = {}));
}(this, (function (exports) { 'use strict';

  /**
   * Compose a function and pipe each return.
   *
   * @param  {...any} functions Functions to be called from left to right.
   * @example
   * const add = (n) => n + n
   * const square = (n) => n * n
   * const cube = (n) => n * n * n
   *
   * compose(cube, square, add)(2) // returns 128
   * @returns {compose~composed} - Composed function.
   */
  function compose() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }

    /**
     * Composed function.
     *
     * @param {any} arg - Argument of function.
     * @returns {any} Function result
     */
    var composed = function composed(arg) {
      return functions.reduce(function (value, fn) {
        return fn(value);
      }, arg);
    };

    return composed;
  }

  exports.compose = compose;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=functional.umd.js.map
