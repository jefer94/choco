// import { loadEnv } from '@chocolab/env'

// loadEnv()

// export default {
//   env: {
//     HUB_API: process.env.HUB_API
//   }
// }

const { loadEnv } = require('@chocolab/env')
const withPWA = require('next-pwa')

loadEnv()

module.exports = withPWA({
  env: {
    HUB_API: process.env.HUB_API
  },
  pwa: {
    dest: 'public'
  }
})
