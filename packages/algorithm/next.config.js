// import { loadEnv } from '@choco/env'

// loadEnv()

// export default {
//   env: {
//     HUB_API: process.env.HUB_API
//   }
// }

const { loadEnv } = require('@choco/env')

loadEnv()

module.exports = {
  env: {
    HUB_API: process.env.HUB_API
  }
}
