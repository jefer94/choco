import resolve from 'rollup-plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
// import builtins from 'rollup-plugin-node-builtins'
// import globals from 'rollup-plugin-node-globals'
import { terser } from 'rollup-plugin-terser'

/** @module @choco/configs */

/**
 * @typedef RollupOptions
 * @property {boolean} debug - Is debug.
 * @property {boolean} ignoreEslint - Ignore eslint checking.
 */

/**
 * Rollup config.
 *
 * @param {string} module - Module name.
 * @param {RollupOptions} opts - Rollup config.
 * @example
 * rollup('module-name')
 * @returns {object} Rollup config.
 */
export function rollup(module, { debug, ignoreEslint } = {}) {
  return {
    input: 'src/index.js',
    output: [
      {
        file: `dist/${module}.esm.js`,
        format: 'es',
        sourcemap: true
      },
      {
        file: `dist/${module}.cjs.js`,
        format: 'commonjs',
        preferConst: true,
        sourcemap: true
      },
      {
        file: `dist/${module}.amd.js`,
        format: 'amd',
        sourcemap: true
      },
      {
        file: `dist/${module}.umd.js`,
        format: 'umd',
        name: `@choco/${module}`,
        sourcemap: true
      }
    ],
    external: (id) => !/^(\.|\/)/.test(id),
    plugins: [
      ...[
        // globals(),
        resolve()
        // builtins(),
        // babel(),
      ],
      ...eslintConfig(ignoreEslint),
      ...[
        babel({
          exclude: 'node_modules/**',
          runtimeHelpers: true
        })
      ],
      ...lastPlugins(debug)
    ]
  }
}

/**
 * Last Rollup plugins.
 *
 * @param {boolean} debug - Is debug.
 * @example
 * lastPlugins(true)
 * lastPlugins()
 * @returns {object[]} Array of plugins.
 */
function lastPlugins(debug) {
  return debug ? [
    sourcemaps()
  ] : [
    terser(),
    sourcemaps()
  ]
}

/**
 * Eslint config.
 *
 * @param {boolean} ignore - Ignore eslint?.
 * @returns {object[]} Eslint config.
 */
function eslintConfig(ignore) {
  return !ignore ? [eslint()] : []
}
