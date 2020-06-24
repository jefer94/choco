import { Dictionary } from '@choco/types'
import { memo } from '@choco/functional'
import { keys, externalKey } from './keys'

/** @module @choco/env */

/**
 * Prevent that one env key was replaced.
 *
 * @param {string} key - Env key.
 * @returns {string} Key prefixed.
 */
function envKeyPrefix(key: string): string {
  const prefix = '__ENV__'
  return `${prefix}${key}`
}

/**
 * Reset env.
 *
 * @example
 * resetEnv()
 */
export function resetEnv(): void {
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
export function env(key?: string, value?: string): string | Dictionary {
  const memokey = envKeyPrefix(key)

  if (!key && !value) {
    return (memo<readonly string[]>(keys) || []).reduce((obj, key) =>
      ({ ...obj, [key]: memo(envKeyPrefix(key)) }), {})
  }

  if (value) {
    process.env[key] = value
    memo(memokey, value)
    if (memo(keys)) memo(keys, [...Object.values(memo(keys)), key])
    else memo(keys, [key])
  }
  return memo(memokey) || process.env[key]
}
