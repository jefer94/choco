import { ProjectPermission } from '../models'

export default async function deleteProjectPermission(id: string): Promise<boolean> {
  const { deletedCount } = await ProjectPermission.deleteOne({ _id: id })
  return !!deletedCount
}
