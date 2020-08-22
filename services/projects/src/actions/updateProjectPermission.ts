import { ProjectPermission } from '../models'

type ProjectPermissionArgs = {
  readonly user: string
  readonly project: string
  readonly write?: string
  readonly create?: string
  readonly remove?: string
}

/**
 * Update permission project.
 *
 * @param arg - ProjectPermission object.
 */
export default async function updateProjectPermission(arg: ProjectPermissionArgs): Promise<void> {
  const { user, project, ...obj } = arg
  await ProjectPermission.updateOne({ user, project }, { $set: obj })
}
