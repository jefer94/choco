'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dotenv = _interopDefault(require('dotenv'));
var path = require('path');

/** @module @services/env */

/**
 * @example
 * import '@services/env'
 */
dotenv.config({ path: path.join(process.cwd(), '../../.env'), debug: false });
// const { error, parsed } = dotenv.config({ path: path.join(process.cwd(), '../../.env'), debug: false })

// // was there an error?
// console.error(error)

// // what was parsed?
// console.log(parsed)

// // compare to process.env
// console.dir(process.env)
