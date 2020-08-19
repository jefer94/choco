import { ProjectPermission } from '../models'

type ProjectPermissionArgs = {
  readonly userId: string
  readonly projectId: string
  readonly write?: string
  readonly create?: string
  readonly remove?: string
}

export default async function addProject(obj: ProjectPermissionArgs): Promise<boolean> {
  try {
    const scope = new ProjectPermission(obj)
    await scope.save()
    return true
  }
  catch {
    return false
  }
}
