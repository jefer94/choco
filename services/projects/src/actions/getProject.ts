import { Project, ProjectDocument } from '../models'

/**
 * Get project.
 *
 * @param id - Project id.
 * @returns Project object.
 */
export default async function getProject(id: string): Promise<ProjectDocument> {
  return Project.findOne({ _id: id }).exec()
}
