import { ActivityLog } from '../models'

export default async function addScope(user: string, activity: string): Promise<boolean> {
  try {
    const scope = new ActivityLog({ user, activity })
    await scope.save()
    return true
  }
  catch {
    return false
  }
}
