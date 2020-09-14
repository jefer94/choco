/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import get from './actions/get'
import set from './actions/set'
import getObject from './actions/getObject'
import setObject from './actions/setObject'

const nc = NATS.connect(process.env.BROKER ?
  { json: true, url: process.env.BROKER } : { json: true })

let sid = 0
export const host = 'activity'
export function close(): void {
  nc.unsubscribe(sid)
}

export enum requestRefs {
  get = 'get',
  set = 'set',
  getObject = 'get object',
  setObject = 'set object'
}

export const notFound = 'command not found'

export default async function server(): Promise<void> {
  sid = nc.subscribe(host, async (msg, reply) => {
    if (reply) {
      const { type, key, value } = msg

      if (type === requestRefs.get) nc.publish(reply, await get(key))
      else if (type === requestRefs.set) nc.publish(reply, await set(key, value))
      else if (type === requestRefs.getObject) nc.publish(reply, await getObject(key))
      else if (type === requestRefs.setObject) nc.publish(reply, await setObject(key, value))
      else nc.publish(reply, { error: 'command not found' })
    }
  })
}
