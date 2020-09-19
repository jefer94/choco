/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, JSONCodec } from 'nats'
import get from './actions/get'
import set from './actions/set'
import getObject from './actions/getObject'
import setObject from './actions/setObject'

// let sid = 0
export const host = 'cache'
export function close(): void {
  // nc.unsubscribe(sid)
}

export enum requestRefs {
  get = 'get',
  set = 'set',
  getObject = 'get object',
  setObject = 'set object'
}

export const notFound = 'command not found'

export default async function server(): Promise<void> {
  const nc = await connect(process.env.BROKER ?
    { servers: process.env.BROKER } : {})

  nc.subscribe(host, { callback: async (err, msg) => {
    const { decode, encode } = JSONCodec()
    const { reply, data } = msg

    if (reply) {
      try {
        const { type, key, value } = decode(data)

        if (type === requestRefs.get) nc.publish(reply, encode(await get(key)))
        else if (type === requestRefs.set) {
          nc.publish(reply, encode(await set(key, value)))
        }
        else if (type === requestRefs.getObject) {
          nc.publish(reply, encode(await getObject(key)))
        }
        else if (type === requestRefs.setObject) {
          nc.publish(reply, encode(await setObject(key, value)))
        }
      }
      catch { nc.publish(reply, encode({ error: notFound })) }
    }
  } })
}
