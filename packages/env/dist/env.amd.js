define(['dotenv', 'path'], function (dotenv, path) { 'use strict';

	dotenv = dotenv && Object.prototype.hasOwnProperty.call(dotenv, 'default') ? dotenv['default'] : dotenv;

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

});
//# sourceMappingURL=env.amd.js.map
