/** @module @choco/keychain */

/**
 * Acumulators by key.
 *
 * @constant {string}
 * @default
 */
const cache = {}

/**
 * Get a unique React key.
 *
 * @param {string} key - Namespace of counter.
 * @example
 * keychain('potato') // returns 'potato_0'
 * keychain('potato') // returns 'potato_1'
 * keychain('potato') // returns 'potato_2'
 * // ...
 * @returns {string} Unique React key.
 */
export default function keychain(key) {
  if (Number.isInteger(cache[key])) {
    cache[key] += 1
  } else { cache[key] = 0 }
  return `${key}_${cache[key]}`
}
