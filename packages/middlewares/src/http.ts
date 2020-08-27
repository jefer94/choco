/* eslint-disable no-shadow */
import { Application } from 'express'
import http from 'http'
import { env } from '@chocolab/env'
import chalk from 'chalk'

let server: http.Server

/**
 * Listen Express app.
 *
 * @param app - Express app.
 * @example
 * ```
 * import express from 'express'
 * const app = express()
 * listen(app)
 * ```
 */
export function listen(app: Application): void {
  server = http.createServer(app)
  const port = env('PORT') || 3000
  server.listen(port, () => {
    console.log(`
      PORT: ${chalk.red(port)}
      ENV: ${chalk.red(app.get('env'))}
    `)
  })
}

/** Close http connection if exist. */
export function close(): void {
  if (server) server.close()
}
