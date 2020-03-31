'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const dotenv = _interopDefault(require('dotenv'));
const path = require('path');

/** @module @services/env */

/**
 * @example
 * import '@services/env'
 */

dotenv.config({
  path: path.join(process.cwd(), '../../.env'),
  debug: false
}); // const { error, parsed } = dotenv.config({ path: path.join(process.cwd(), '../../.env'), debug: false })
// // was there an error?
// console.error(error)
// // what was parsed?
// console.log(parsed)
// // compare to process.env
// console.dir(process.env)
//# sourceMappingURL=env.cjs.js.map
