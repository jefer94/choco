/** @module @choco/configs */

/**
 * @typedef {object} BabelConfig
 * @property {boolean} isServer - Is server.
 * @property {boolean} useTransformRuntime - Use transform runtime.
 * @property {boolean} types - Use types.
 */

/**
 * Babel config.
 *
 * @param {BabelConfig} BabelConfig - Babel configs.
 * @example
 * const isServer = true
 * const useTransformRuntime = true
 * babel(isServer, useTransformRuntime)
 * @returns {object} Babel config.
 */
export function babel({ isServer = true, useTransformRuntime = true, types } = {}) {
  return {
    presets: [
      // next.js
      // '@babel/preset-react',
      ...presetTypescript(types),
      ...presetEnv(isServer)
    ],
    plugins: [...[
      '@babel/plugin-proposal-class-properties',
      ['styled-components', { ssr: true, displayName: true, preprocess: false }],
      ...transformRuntime(useTransformRuntime)
    ]],
    ignore: []
  }
}

/**
 * Babel Next.js config.
 *
 * @example
 * babelNextJS()
 * @returns {object} Babel Next.JS config.
 */
export function babelNextJS() {
  return {
    plugins: [
      ['styled-components', { ssr: true, displayName: true, preprocess: false }]
    ],
    presets: ['next/babel']
  }
}

/**
 * Babel preset Typescript config.
 *
 * @param {boolean} types - Accept types.
 * @returns {string[]} Babel preset Typescript config.
 */
function presetTypescript(types) {
  if (types) return ['@babel/preset-typescript']
  return []
}

/**
 * Babel preset config.
 *
 * @param {boolean} isServer - Is server.
 * @example
 * presetEnv(true) // not use react
 * presetEnv(false) // use react
 * @returns {object} Babel preset env config.
 */
function presetEnv(isServer) {
  return isServer ? [[
    '@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ]] : ['@babel/preset-env', '@babel/preset-react']
}

/**
 * Babel transform runtime config.
 *
 * @param {boolean} useTransformRuntime - Use transform runtime.
 * @example
 * transformRuntime(true) // use transform runtime
 * transformRuntime(false) // not use transform runtime
 * @returns {object} Babel transform runtime.
 */
function transformRuntime(useTransformRuntime) {
  return useTransformRuntime ? [[
    '@babel/plugin-transform-runtime',
    {
      regenerator: true,
      helpers: true
    }
  ]] : []
}
