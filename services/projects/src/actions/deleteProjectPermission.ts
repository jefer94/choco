import { ProjectPermission } from '../models'

/**
 * Delete project permission.
 *
 * @param id - ProjectPermission id.
 * @returns Was delete.
 */
export default async function deleteProjectPermission(id: string): Promise<boolean> {
  const { deletedCount } = await ProjectPermission.deleteOne({ _id: id })
  return !!deletedCount
}
