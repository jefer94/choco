import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/**
 * Inject common middlewares.
 * 
 * @param {object} app - Express app.
 * @example
 * import express from 'express'
 * import common from '@services/express-common'
 * 
 * const app = express()
 * 
 * common(app)
 */
function index (app) {
  app
    .use(morgan('combined'))
    .use(helmet())
    .use(cors());
}

export default index;
