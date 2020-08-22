import { ActivityLog, ActivityLogDocument } from '../models'

export default async function fetchAllActivities(): Promise<readonly ActivityLogDocument[]> {
  return ActivityLog.find({}).populate('activity').populate('service').exec()
}
