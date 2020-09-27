import { ActivityLog, ActivityLogDocument } from '../models'
import getUser from '../bindings/getUser'

type AddActivityLog = {
  readonly data?: ActivityLogDocument
  readonly error?: string
}

/**
 * Log one activity of one user.
 * @param user - User id.
 * @param activity - Activity id.
 * @returns Was added?.
 */
export default async function addActivityLog(user: string, activity: string):
  Promise<AddActivityLog> {
  try {
    const scope = new ActivityLog({ user, activity })
    await scope.save()
    scope.populate('activity')
    return { data: { ...scope.toObject(), user: await getUser(user) } }
  }
  catch (e) {
    return { error: e.message }
  }
}
