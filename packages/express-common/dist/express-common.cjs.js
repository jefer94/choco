'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cors = _interopDefault(require('cors'));
var helmet = _interopDefault(require('helmet'));
var morgan = _interopDefault(require('morgan'));

/**
 * Inject common middlewares.
 * 
 * @param {object} app - Express app.
 * @example
 * import express from 'express'
 * import common from '@choco/express-common'
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

module.exports = index;
