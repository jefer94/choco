import { Project } from '../models'

/**
 * Delete project.
 *
 * @param id - Project id.
 * @returns Was delete.
 */
export default async function deleteProject(id: string): Promise<boolean> {
  const { deletedCount } = await Project.deleteOne({ _id: id })
  return !!deletedCount
}
