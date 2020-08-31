// import { loadEnv } from '@chocolab/env'

// loadEnv()

// export default {
//   env: {
//     HUB_API: process.env.HUB_API
//   }
// }

const { loadEnv } = require('@chocolab/env')
const withPWA = require('next-pwa')
const withCSS = require('@zeit/next-css');

// let config
// withCSS({
//   cssLoaderOptions: {
//     url: false
//   }
// });

loadEnv()

module.exports = withCSS(withPWA({
  env: {
    HUB_API: process.env.HUB_API
  },
  pwa: {
    dest: 'public'
  },
  cssLoaderOptions: {
    url: false
  }
}))
