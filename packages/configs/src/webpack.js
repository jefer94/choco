import * as path from 'path'
import nodeExternals from 'webpack-node-externals'
import NodemonPlugin from 'nodemon-webpack-plugin'
import { env, loadEnv } from '@choco/env'

loadEnv()

/** @module @choco/configs */

/**
 * Webpack config.
 *
 * @example
 * webpack(__dirname)
 * @param {string} dirname - __dirname.
 * @returns {object} Webpack config.
 */
export function webpack(dirname) {
  return {
    entry: path.join(dirname, 'src/index.js'),
    output: {
      path: path.join(dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    target: 'node',
    mode: env('APP_ENV') === 'production' ? 'production' : 'development',
    node: {
      __dirname: true,
      __filename: true
    },
    devtool: env('APP_ENV') === 'development' ? 'eval-cheap-source-map' : 'eval',
    externals: [nodeExternals({
      modulesDir: path.join(dirname, '../../node_modules')
    })],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
          // use: ['babel-loader', 'eslint-loader']
        }
      ]
    },
    plugins: [
      new NodemonPlugin()
    ]
  }
}
