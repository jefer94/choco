const { loadEnv } = require('@choco/env')

loadEnv()

module.exports = {
  env: {
    HUB_API: process.env.HUB_API
  }
}
