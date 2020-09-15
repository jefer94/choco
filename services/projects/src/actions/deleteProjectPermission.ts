import { ProjectPermission, ProjectPermissionDocument } from '../models'

type DeleteProjectPermission = {
  readonly data?: ProjectPermissionDocument
  readonly error?: string
}

/**
 * Delete project permission.
 *
 * @param id - ProjectPermission id.
 * @returns Was delete.
 */
export default async function deleteProjectPermission(id: string):
  Promise<DeleteProjectPermission> {
  return { data: await ProjectPermission.findOneAndDelete({ _id: id }) }
}
