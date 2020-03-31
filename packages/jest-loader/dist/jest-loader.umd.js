(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['@choco/jest-loader'] = factory());
}(this, (function () { 'use strict';

  function loader (isServer) {
    return {
      presets: ['@babel/preset-react', presetEnv(isServer)]
    };
  }

  function presetEnv(isServer) {
    return isServer ? ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }] : '@babel/preset-env';
  }

  return loader;

})));
//# sourceMappingURL=jest-loader.umd.js.map
