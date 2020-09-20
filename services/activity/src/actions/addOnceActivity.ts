/* eslint-disable no-underscore-dangle */
import { Activity, ActivityDocument } from '../models'

type AddOnceActivity = {
  readonly data: ActivityDocument
}

/**
 * Add once activity.
 * @param name - Activity name.
 * @param service - Service id.
 * @returns Activity id.
 */
export default async function addOnceActivity(name: string, service: string):
  Promise<AddOnceActivity> {
  try {
    const activity = new Activity({ name, service })
    await activity.save()
    return { data: activity }
  }
  catch {
    const activity = await Activity.findOne({ name, service }).exec()
    return { data: activity }
  }
}
