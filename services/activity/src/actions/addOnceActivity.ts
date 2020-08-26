/* eslint-disable no-underscore-dangle */
import { Activity } from '../models'

/**
 * Add once activity.
 *
 * @param name - Activity name.
 * @param service - Service id.
 * @returns Activity id.
 */
export default async function addOnceActivity(name: string, service: string): Promise<number> {
  try {
    const activity = new Activity({ name, service })
    await activity.save()
    return activity._id
  }
  catch {
    const activity = await Activity.findOne({ name, service }).exec()
    return activity._id
  }
}
