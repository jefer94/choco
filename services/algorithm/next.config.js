// import { loadEnv } from '@choco/env'

// loadEnv()

// export default {
//   env: {
//     HUB_API: process.env.HUB_API
//   }
// }

const { loadEnv } = require('@choco/env')
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
