import { ActivityLog, ActivityLogDocument, ActivityLogFields } from '../models'

// type FA = readonly ActivityLogFields[]
// type FA = readonly ActivityLogDocument[]
type FA = {
  readonly id?: any
  readonly user: string
  readonly activity: Pick<ActivityLogDocument, 'id'>
}

type FetchActivities = {
  readonly data: readonly FA[]
}

/**
 * Fetch Activities by user id.
 * @param user - User id.
 * @returns User activities.
 */
export default async function fetchActivities(user: string): Promise<FetchActivities> {
  const activities = await ActivityLog.find({ user }).populate('activity').populate('service').lean()
  // const activities2 = await ActivityLog.find({}).populate('activity').populate('service').lean()

  // console.log('vv', activities)
  // console.log('vv2', activities2)
  return { data: activities.map((act) => {
    const { activity, ...obj } = transformId(act)

    return { ...obj, activity: transformActivityId(activity) }
  }) }
}

function transformId(model: Pick<ActivityLogDocument, '_id' | '__v' | 'user' | 'activity'>): Pick<ActivityLogDocument, 'id' | 'user' | 'activity'> {
  const { _id, __v, ...obj } = model
  return { id: _id, ...obj }
}

function transformActivityId(model: Pick<ActivityLogDocument, '_id' | '__v'>): Pick<ActivityLogDocument, 'id'> {
  const { _id, __v, ...obj } = model
  return { id: _id, ...obj }
}
