import getUser from '../bindings/getUser'
import { ActivityDocument, ActivityLog } from '../models'

export type ActivityWithUser = {
  readonly user: Record<string, unknown>
  readonly activity: Pick<ActivityDocument, '_id' | 'name' | 'service'>
}

type FetchActivities = {
  readonly data?: readonly ActivityWithUser[]
  readonly error?: string
}

/**
 * Fetch Activities by user id.
 * @param user - User id.
 * @returns User activities.
 */
export default async function fetchActivities(user: string): Promise<FetchActivities> {
  const activities = await ActivityLog.find({ user }).populate('activity').populate('service').lean()
  return { data: await Promise.all(activities.map(async ({ user, ...activity }) => ({
    ...activity,
    user: await getUser(user)
  }))) }
}
