(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cors'), require('helmet'), require('morgan')) :
  typeof define === 'function' && define.amd ? define(['cors', 'helmet', 'morgan'], factory) :
  (global = global || self, global['@choco/express-common'] = factory(global.cors, global.helmet, global.morgan));
}(this, (function (cors, helmet, morgan) { 'use strict';

  cors = cors && Object.prototype.hasOwnProperty.call(cors, 'default') ? cors['default'] : cors;
  helmet = helmet && Object.prototype.hasOwnProperty.call(helmet, 'default') ? helmet['default'] : helmet;
  morgan = morgan && Object.prototype.hasOwnProperty.call(morgan, 'default') ? morgan['default'] : morgan;

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

  return index;

})));
