import { ProjectPermission, ProjectPermissionFields } from '../models'

type GetProjectPermission = {
  readonly data: ProjectPermissionFields
}
/**
 * Get project permission.
 * @param id - ProjectPermission id.
 * @returns ProjectPermission object.
 */
export default async function getProjectPermission(id: string): Promise<GetProjectPermission> {
  return { data: await ProjectPermission.findOne({ _id: id }).lean() }
}
