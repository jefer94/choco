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

export default loader;
//# sourceMappingURL=jest-loader.esm.js.map
