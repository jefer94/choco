import dotenv from 'dotenv'
import { memo } from '@choco/functional'
import { keys, externalKey } from './keys'

/** @module @choco/env */

/**
 * Load env.
 *
 * @param {boolean} externalEnv - Value.
 * @example
 * loadEnv()
 */
export function loadEnv(externalEnv) {
  if (externalEnv && typeof externalEnv === 'object') { memo(externalKey, externalEnv) }
  if (!memo(keys)) { memo(keys, []) }
  dotenv.config({ path: '../../.env' })

  const data = externalEnv || process.env
  Object.keys(data).forEach((key) => {
    const memokey = `__ENV__${key}`
    memo(memokey, data[key])
    memo(keys, [...memo(keys), key])
  })
}
