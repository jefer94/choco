import client from '../db'

// type Get = {
//   readonly data: string
// }

type Get = {
  readonly data: {
    readonly key: string
    readonly value: string
  }
}

export default async function get(key: string): Promise<Get> {
  return { data: { key, value: await getPromise(key) } }
}

/**
 * Get value from key.
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
