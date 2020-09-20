import { ProjectPermission, ProjectPermissionDocument } from '../models'

type AddProjectPermission = {
  readonly data?: ProjectPermissionDocument
  readonly error?: string
}

type ProjectPermissionArgs = {
  readonly user: string
  readonly project: string
  readonly write?: string
  readonly create?: string
  readonly delete?: string
}

/**
 * Add new project permission.
 * @param obj - Project permission object.
 * @returns Was saved?.
 */
export default async function addProjectPermission(obj: ProjectPermissionArgs):
  Promise<AddProjectPermission> {
  try {
    const perm = new ProjectPermission(obj)
    await perm.save()
    return { data: perm }
  }
  catch (e) {
    return { error: e.message }
  }
}
