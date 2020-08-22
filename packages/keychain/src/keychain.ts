import { memo } from '@choco/functional'

/**
 * Get a unique React key.
 *
 * @param key - Namespace of counter.
 * @example
 * ```
 * keychain('potato') // returns 'potato_0'
 * keychain('potato') // returns 'potato_1'
 * keychain('potato') // returns 'potato_2'
 * // ...
 * ```
 * @returns Unique key.
 */
export default function keychain(key: string): string {
  const memoKey = `__KEYCHAIN_${key}__`
  const acc = memo<number>(memoKey)
  if (Number.isInteger(acc)) memo(memoKey, acc + 1)
  else memo(memoKey, 0)
  return `${key}_${memo(memoKey)}`
}
