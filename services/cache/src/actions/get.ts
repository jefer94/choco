import client from '../db'

export default function get(key: string): Promise<string> {
  return getPromise(key)
}

/**
 * Get value from key.
 *
 * @param key - Key.
 * @returns Value.
 */
function getPromise(key: string): Promise<string> {
  return new Promise((resolve) => {
    client.get(key, (err, value) => {
      // if (err) { reject(err) }
      resolve(value)
    })
  })
}
