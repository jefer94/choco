import { ProjectPermission } from '../models'

type ProjectPermissionArgs = {
  readonly userId: string
  readonly projectId: string
  readonly write?: string
  readonly create?: string
  readonly remove?: string
}

export default async function updateProjectPermission(arg: ProjectPermissionArgs): Promise<void> {
  const { userId, projectId, ...obj } = arg
  await ProjectPermission.updateOne({ userId, projectId }, { $set: obj })
}
