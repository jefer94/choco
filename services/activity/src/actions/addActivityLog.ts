import { ActivityLog, ActivityLogDocument } from '../models'

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
    return { data: scope }
  }
  catch (e) {
    return { error: e.message }
  }
}
