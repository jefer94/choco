export default function(isServer) {
  return {
    presets: [
      '@babel/preset-react',
      presetEnv(isServer)
    ]
  }
}

function presetEnv(isServer) {
  return isServer ? [
    '@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ] : '@babel/preset-env'
}
