/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import addActivityLog from './actions/addActivityLog'
import addOnceActivity from './actions/addOnceActivity'
import addOnceService from './actions/addOnceService'
import deleteService from './actions/deleteService'
import fetchActivities from './actions/fetchActivities'
import fetchAllActivities from './actions/fetchAllActivities'

const nc = NATS.connect({ json: true })

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

export enum statusRefs {
  success = 'Success',
  reject = 'Reject',
  notFound = 'Not found'
}

export default async function server(): Promise<void> {
  sid = nc.subscribe(host, async (msg, reply) => {
    if (reply) {
      const { type, ...data } = msg
      // console.log(type)

      if (type === requestRefs.addActivityLog) {
        const bool = await addActivityLog(data.user, data.activity)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.addOnceActivity) {
        const value = await addOnceActivity(data.name, data.service)
        const res = {
          status: statusRefs.success,
          data: value
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.addOnceService) {
        const value = await addOnceService(data.name)
        const res = {
          status: statusRefs.success,
          data: value
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.deleteService) {
        await deleteService(data.name)
        const res = {
          status: statusRefs.success
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchActivities) {
        const arr = await fetchActivities(data.user)
        const res = { status: statusRefs.success, data: arr }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchAllActivities) {
        const arr = await fetchAllActivities()
        const res = { status: statusRefs.success, data: arr }
        nc.publish(reply, res)
      }
      else nc.publish(reply, { status: statusRefs.notFound })
    }
  })
}
