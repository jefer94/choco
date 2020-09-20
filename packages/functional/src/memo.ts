// type Cache = Record<string, unknown>

// const cache: Cache = {}
const cache = {}

/**
 * Memoize by key.
 * @param key - Memo key.
 * @param data - Memo data.
 * @example
 * ```
 * memo('potato', 7) // returns 7
 * memo('potato') // returns 7
 * ```
 * @returns Data memoize.
 */
export function memo<Type>(key: string, data?: Type): Type {
  if (data !== undefined) cache[key] = data
  return cache[key]
}
