import { ProjectPermission, ProjectPermissionDocument } from '../models'

type UpdateProjectPermission = {
  readonly data?: ProjectPermissionDocument
  readonly error?: string
}

type ProjectPermissionArgs = {
  readonly user: string
  readonly project: string
  readonly write?: boolean
  readonly create?: boolean
  readonly delete?: boolean
}

/**
 * Update permission project.
 *
 * @param arg - ProjectPermission object.
 */
export default async function updateProjectPermission(arg: ProjectPermissionArgs):
  Promise<UpdateProjectPermission> {
  const { user, project, ...obj } = arg
  try {
    return { data: await ProjectPermission.findOneAndUpdate({ user, project }, obj, { new: true }) }
  }
  catch (e) {
    return { error: e.message }
  }
}
