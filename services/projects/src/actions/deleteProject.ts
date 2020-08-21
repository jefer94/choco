import { Project } from '../models'

export default async function deleteProject(id: string): Promise<boolean> {
  const { deletedCount } = await Project.deleteOne({ _id: id })
  return !!deletedCount
}
