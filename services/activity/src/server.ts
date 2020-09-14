/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import addActivityLog from './actions/addActivityLog'
import addOnceActivity from './actions/addOnceActivity'
import addOnceService from './actions/addOnceService'
import deleteService from './actions/deleteService'
import fetchActivities from './actions/fetchActivities'
import fetchAllActivities from './actions/fetchAllActivities'

const nc = NATS.connect(process.env.BROKER ?
  { json: true, url: process.env.BROKER } : { json: true })

let sid = 0
export const host = 'activity'
export function close(): void {
  nc.unsubscribe(sid)
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
  sid = nc.subscribe(host, async (msg, reply) => {
    if (reply) {
      const { type, ...data } = msg

      if (type === requestRefs.addActivityLog) {
        nc.publish(reply, await addActivityLog(data.user, data.activity))
      }
      else if (type === requestRefs.addOnceActivity) {
        nc.publish(reply, await addOnceActivity(data.name, data.service))
      }
      else if (type === requestRefs.addOnceService) {
        nc.publish(reply, await addOnceService(data.name))
      }
      else if (type === requestRefs.deleteService) {
        nc.publish(reply, await deleteService(data.name))
      }
      else if (type === requestRefs.fetchActivities) {
        nc.publish(reply, await fetchActivities(data.user))
      }
      else if (type === requestRefs.fetchAllActivities) {
        nc.publish(reply, await fetchAllActivities())
      }
      else nc.publish(reply, { error: notFound })
    }
  })
}
