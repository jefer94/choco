import resolve from 'rollup-plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
// import builtins from 'rollup-plugin-node-builtins'
// import globals from 'rollup-plugin-node-globals'
import { terser } from 'rollup-plugin-terser'
// import typescript from '@rollup/plugin-typescript'

/**
 * Rollup config.
 *
 * @param module - Module name.
 * @param opts - Rollup config.
 * @example
 * rollup('module-name')
 * @returns Rollup config.
 */
export function rollup(module, { debug, ignoreEslint, types } = {}) {
  return {
    input: `src/index.${types ? 'ts' : 'js'}`,
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
      }
    ],
    external: (id) => !/^(\.|\/)/.test(id),
    plugins: [
      // globals(),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      // builtins(),
      // babel(),
      ...eslintConfig(ignoreEslint),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      ...lastPlugins(debug)
    ]
  }
}

/**
 * Last Rollup plugins.
 *
 * @param debug - Is debug.
 * @example
 * lastPlugins(true)
 * lastPlugins()
 * @returns Array of plugins.
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
 * @param ignore - Ignore eslint?.
 * @returns Eslint config.
 */
function eslintConfig(ignore) {
  return !ignore ? [eslint()] : []
}
