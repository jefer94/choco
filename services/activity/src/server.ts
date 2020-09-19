/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, JSONCodec } from 'nats'
import addActivityLog from './actions/addActivityLog'
import addOnceActivity from './actions/addOnceActivity'
import addOnceService from './actions/addOnceService'
import deleteService from './actions/deleteService'
import fetchActivities from './actions/fetchActivities'
import fetchAllActivities from './actions/fetchAllActivities'

// let sid = 0
export const host = 'activity'
export function close(): void {
  // nc.unsubscribe(sid)
}

export enum requestRefs {
  addActivityLog = 'add activity log',
  addOnceActivity = 'add once activity',
  addOnceService = 'add once service',
  deleteService = 'delete service',
  fetchActivities = 'fetch activities',
  fetchAllActivities = 'fetch all activities'
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
        const { type, ...request } = decode(data)

        if (type === requestRefs.addActivityLog) {
          nc.publish(reply, encode(await addActivityLog(request.user, request.activity)))
        }
        else if (type === requestRefs.addOnceActivity) {
          nc.publish(reply, encode(await addOnceActivity(request.name, request.service)))
        }
        else if (type === requestRefs.addOnceService) {
          nc.publish(reply, encode(await addOnceService(request.name)))
        }
        else if (type === requestRefs.deleteService) {
          nc.publish(reply, encode(await deleteService(request.name)))
        }
        else if (type === requestRefs.fetchActivities) {
          nc.publish(reply, encode(await fetchActivities(request.user)))
        }
        else if (type === requestRefs.fetchAllActivities) {
          nc.publish(reply, encode(await fetchAllActivities()))
        }
      }
      catch { nc.publish(reply, encode({ error: notFound })) }
    }
  } })
}
