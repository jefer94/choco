import { JSONCodec } from 'nats'
import addActivityLog from './actions/addActivityLog'
import addOnceActivity from './actions/addOnceActivity'
import addOnceService from './actions/addOnceService'
import deleteService from './actions/deleteService'
import fetchActivities from './actions/fetchActivities'
import fetchAllActivities from './actions/fetchAllActivities'
import connection from './broker'

export const host = 'activity'
export const notFound = 'command not found'
export enum actions {
  addActivityLog = 'add activity log',
  addOnceActivity = 'add once activity',
  addOnceService = 'add once service',
  deleteService = 'delete service',
  fetchActivities = 'fetch activities',
  fetchAllActivities = 'fetch all activities'
}

export default async function server(): Promise<void> {
  const nc = await connection()

  nc.subscribe(host, { callback: async (err, msg) => {
    const { decode, encode } = JSONCodec()
    const { reply, data } = msg

    if (reply) {
      try {
        const { type, ...request } = decode(data)

        if (type === actions.addActivityLog) {
          nc.publish(reply, encode(await addActivityLog(request.user, request.activity)))
        }
        else if (type === actions.addOnceActivity) {
          nc.publish(reply, encode(await addOnceActivity(request.name, request.service)))
        }
        else if (type === actions.addOnceService) {
          nc.publish(reply, encode(await addOnceService(request.name)))
        }
        else if (type === actions.deleteService) {
          nc.publish(reply, encode(await deleteService(request.name)))
        }
        else if (type === actions.fetchActivities) {
          nc.publish(reply, encode(await fetchActivities(request.user)))
        }
        else if (type === actions.fetchAllActivities) {
          nc.publish(reply, encode(await fetchAllActivities()))
        }
      }
      catch { nc.publish(reply, encode({ error: notFound })) }
    }
  } })
}
