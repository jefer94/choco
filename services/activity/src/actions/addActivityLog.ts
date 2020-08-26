import { ActivityLog } from '../models'

/**
 * Log one activity of one user.
 *
 * @param user - User id.
 * @param activity - Activity id.
 * @returns Was added?.
 */
export default async function addActivityLog(user: string, activity: string): Promise<boolean> {
  try {
    const scope = new ActivityLog({ user, activity })
    await scope.save()
    return true
  }
  catch {
    return false
  }
}
