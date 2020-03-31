define(function () { 'use strict';

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

});
//# sourceMappingURL=jest-loader.amd.js.map
