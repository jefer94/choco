(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('dotenv'), require('path')) :
	typeof define === 'function' && define.amd ? define(['dotenv', 'path'], factory) :
	(global = global || self, factory(global.dotenv, global.path));
}(this, (function (dotenv, path) { 'use strict';

	dotenv = dotenv && Object.prototype.hasOwnProperty.call(dotenv, 'default') ? dotenv['default'] : dotenv;

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

})));
