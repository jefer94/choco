/* eslint-disable no-underscore-dangle */
import { Activity, ActivityDocument } from '../models'

type AddOnceActivity = {
  readonly data: Pick<ActivityDocument, '_id' | 'name' | 'service'>
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

    activity.populate('service')
    activity.populate('activityLogs')

    return { data: activity }
  }
  catch {
    const activity = await Activity.findOne({ name, service })
      .populate('service')
      .populate('activityLogs')
      .exec()
      // .lean()
    return { data: activity }
  }
}
