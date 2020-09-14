import { ActivityLog, ActivityLogDocument, ActivityLogFields } from '../models'

// type FA = readonly ActivityLogFields[]
type FAA = {
  readonly id?: any
  readonly user: string
  readonly activity: Pick<ActivityLogDocument, 'id'>
}

type FetchActivities = {
  readonly data?: readonly FAA[]
  readonly error?: string
}

/**
 * Fetch all Activities in logs.
 *
 * @returns All activities.
 */
export default async function fetchActivities(): Promise<FetchActivities> {
  const activities = await ActivityLog.find({}).populate('activity').populate('service').lean()

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
