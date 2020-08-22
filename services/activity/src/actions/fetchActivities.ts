import { ActivityLog, ActivityLogDocument } from '../models'

type FA = readonly ActivityLogDocument[]
export default async function fetchActivities(user: string): Promise<FA> {
  return ActivityLog.find({ user }).populate('activity').populate('service').exec()
}
