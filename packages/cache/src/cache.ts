import express from 'express'
import bodyParser from 'body-parser'
import { createClient, print } from 'redis'
import chalk from 'chalk'
import middlewares, { listen as httpListen, httpClose } from '@choco/middlewares'

const { log } = console

/** @module @choco/cache */

const app = express()
let client

/**
 * Start Redis.
 *
 * @example
 * startDB()
 */
export function startDB(): void {
  client = createClient()

  client.on('error', (error) => {
    log(chalk.red(error))
  })
}

export const listen = (): void => httpListen(app)
export const close = httpClose

/**
 * Get value from key.
 *
 * @example
 * clientGet('key') // return redis promise
 * @param {string} key - Key.
 * @returns {Promise} Value.
 */
function clientGet(key): Promise<string> {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) { reject(err) }
      resolve(value)
    })
  })
}

middlewares(app)

// const clientGet = promisify(client.get).bind(client)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', async (req, res) => {
  if (req.body) {
    try {
      const { mode, key, value } = req.body
      if (mode && key) {
        if (mode === 'set' && value) {
          client.set(req.body.key, req.body.value, print)
          res.statusCode = 204
          res.send()
        }
        else {
          res.send(await clientGet(req.body.key))
        }
      }
    }
    catch (e) {
      res.statusCode = 500
      res.json(JSON.stringify(e))
    }
  }
  else {
    res.statusCode = 500
    res.send('')
  }
})

export default app
