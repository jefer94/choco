import { config } from 'dotenv'
import { memo } from '@chocolab/functional'
import { keys, externalKey } from './keys'

/**
 * Load env.
 * @param externalEnv - Value.
 * @example
 * ```
 * loadEnv()
 * ```
 */
export function loadEnv(externalEnv?: Record<string, string>): void {
  if (externalEnv && typeof externalEnv === 'object') { memo(externalKey, externalEnv) }
  if (!memo(keys)) { memo(keys, []) }
  config({ path: '../../.env' })

  const data = externalEnv || process.env
  Object.keys(data).forEach((key) => {
    const memokey = `__ENV__${key}`
    memo(memokey, data[key])
    memo(keys, [...memo<readonly string[]>(keys), key])
  })
}
