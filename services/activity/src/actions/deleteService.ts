/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import { Service, Activity, ActivityLog, ServiceDocument } from '../models'

type DeleteService = {
  readonly data: ServiceDocument
}

/**
 * Delete service in cascade.
 *
 * @param name - Service name.
 */
export default async function deleteService(name: string): Promise<DeleteService> {
  const service = await Service.findOne({ name }).exec()
  const activities = await Activity.find({ service: service._id }).exec()

  for (const activity of activities) {
    const logs = await ActivityLog.find({ activity: activity._id }).exec()

    for (const log of logs) {
      await log.remove()
    }
    await activity.remove()
  }
  await service.remove()
  return { data: service }
}
