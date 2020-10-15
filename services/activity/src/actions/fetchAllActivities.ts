import { ActivityDocument, ActivityLog } from '../models'
import getUser from '../bindings/getUser'

export type ActivityWithUser = {
  readonly user: Record<string, unknown>
  readonly activity: Pick<ActivityDocument, '_id' | 'name' | 'service'>
}

type FetchActivities = {
  readonly data?: readonly ActivityWithUser[]
  readonly error?: string
}

/**
 * Fetch all Activities in logs.
 * @returns All activities.
 */
export default async function fetchActivities(): Promise<FetchActivities> {
  const activities = await ActivityLog.find({}).populate('activity').populate('service').exec()
  return { data: await Promise.all(activities.map(async ({ user, ...activity }) => ({
    ...activity,
    user: await getUser(user)
  }))) }
}
