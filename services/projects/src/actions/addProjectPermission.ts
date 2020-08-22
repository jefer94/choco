import { ProjectPermission } from '../models'

type ProjectPermissionArgs = {
  readonly user: string
  readonly project: string
  readonly write?: string
  readonly create?: string
  readonly remove?: string
}

/**
 * Add new project permission.
 *
 * @param obj - Project permission object.
 * @returns Was saved?.
 */
export default async function addProjectPermission(obj: ProjectPermissionArgs): Promise<boolean> {
  try {
    const scope = new ProjectPermission(obj)
    await scope.save()
    return true
  }
  catch {
    return false
  }
}
