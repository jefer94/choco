import { ProjectPermission, ProjectPermissionDocument } from '../models'

/**
 * Get project permission.
 *
 * @param id - ProjectPermission id.
 * @returns ProjectPermission object.
 */
export default async function getProjectPermission(id: string): Promise<ProjectPermissionDocument> {
  return ProjectPermission.findOne({ _id: id }).exec()
}
