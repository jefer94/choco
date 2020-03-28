const withPWA = require('next-pwa')

if (process.env.NODE_ENV === 'production') {
  module.exports = withPWA({
    pwa: {
      dest: 'public'
    }
  })
}

// const withCSS = require('@zeit/next-css');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// const withOffline = require('next-offline')

// console.log('a', withOffline())
// module.exports = withOffline()


// module.exports = withOffline(withCSS({
//   webpack(config, options) {
//     config.plugins.push(new MonacoWebpackPlugin())

//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         test: /\.(js|ts)x?$/,
//       },
//       use: ['@svgr/webpack']
//     })

//     return config
//   },
//   cssLoaderOptions: { url: false }
// }))
