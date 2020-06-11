import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

/** @module @choco/middlewares */

/**
 * Inject common middlewares.
 *
 * @param {object} app - Express app.
 * @param {string} dir - Express static directory.
 * @example
 * import express from 'express'
 * import common from '@choco/express-common'
 *
 * const app = express()
 *
 * common(app)
 * common(app, __dirname)
 */
export default function (app, dir) {
  app
    .use(morgan('combined'))
    .use(helmet())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(methodOverride())

  if (dir) { app.use('/public', express.static(`${dir}/public`)) }
}
