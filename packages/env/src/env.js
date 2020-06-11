import { memo } from '@choco/functional'
import { keys, externalKey } from './keys'

/** @module @choco/env */

/**
 * Prevent that one env key was replaced.
 *
 * @param {string} key - Env key.
 * @returns {string} Key prefixed.
 */
function envKeyPrefix(key) {
  const prefix = '__ENV__'
  return `${prefix}${key}`
}

/**
 * Reset env.
 *
 * @example
 * resetEnv()
 */
export function resetEnv() {
  memo(externalKey, {})
  process.env = {}
  memo(keys, [])
}

/**
 * Get/set env.
 *
 * @param {string} key - Key.
 * @param {string} value - Value.
 * @example
 * env('pokemon') // returns undefined
 * env('pokemon', 'potato') // returns 'potato'
 * env('pokemon') // returns 'potato'
 * env() // returns { pokemon: 'potato' }
 * @returns {string|object} Env var.
 */
export function env(key, value) {
  const memokey = envKeyPrefix(key)

  if (!key && !value) {
    return (memo(keys) || []).reduce((obj, key) =>
      ({ ...obj, [key]: memo(envKeyPrefix(key)) }), {})
  }

  if (value) {
    process.env[key] = value
    memo(memokey, value)
    if (memo(keys)) {
      memo(keys, [...Object.values(memo(keys)), key]) // error
    } else {
      memo(keys, [key]) // error
    }
  }
  return memo(memokey) || process.env[key]
}
