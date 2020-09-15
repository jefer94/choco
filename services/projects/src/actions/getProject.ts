import { Project, ProjectFields } from '../models'

type GetProject = {
  readonly data: ProjectFields
}

/**
 * Get project.
 *
 * @param id - Project id.
 * @returns Project object.
 */
export default async function getProject(id: string): Promise<GetProject> {
  return { data: await Project.findOne({ _id: id }).lean() }
}
