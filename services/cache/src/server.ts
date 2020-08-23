/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import get from './actions/get'
import set from './actions/set'
import getObject from './actions/getObject'
import setObject from './actions/setObject'

const nc = NATS.connect({ json: true })

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

export enum statusRefs {
  success = 'Success',
  reject = 'Reject',
  notFound = 'Not found'
}

export default async function server(): Promise<void> {
  sid = nc.subscribe(host, async (msg, reply) => {
    if (reply) {
      const { type, key, value } = msg

      if (type === requestRefs.get) {
        const data = await get(key)
        const status = {
          status: data === null ? statusRefs.reject : statusRefs.success
        }
        const res = data === null ? status : { ...status, data }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.set) {
        const data = await set(key, value)
        const res = {
          status: statusRefs.success,
          data
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.getObject) {
        const data = await getObject(key)
        const status = {
          status: data === null ? statusRefs.reject : statusRefs.success
        }
        const res = data === null ? status : { ...status, data }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.setObject) {
        const data = await setObject(key, value)
        const res = {
          status: statusRefs.success,
          data
        }
        nc.publish(reply, res)
      }
      else nc.publish(reply, { status: statusRefs.notFound })
    }
  })
}
