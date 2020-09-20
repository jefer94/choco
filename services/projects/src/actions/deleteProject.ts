import { Project, ProjectDocument } from '../models'

type DeleteProject = {
  readonly data?: ProjectDocument
  readonly error?: string
}

/**
 * Delete project.
 * @param id - Project id.
 * @returns Was delete.
 */
export default async function deleteProject(id: string): Promise<DeleteProject> {
  return { data: await Project.findOneAndDelete({ _id: id }) }
}
