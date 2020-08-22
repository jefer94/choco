import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

/**
 * Inject common middlewares.
 *
 * @param app - Express app.
 * @param dir - Express static directory.
 * @example
 * ```
 * import express from 'express'
 * import common from '@choco/express-common'
 *
 * const app = express()
 *
 * common(app)
 * common(app, __dirname)
 * ```
 */
export function middlewares(app: Application, dir?: string): void {
  app
    .use(morgan('combined'))
    .use(helmet())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(methodOverride())

  if (dir) { app.use('/public', express.static(`${dir}/public`)) }
}
