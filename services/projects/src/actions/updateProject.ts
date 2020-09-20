import { Project, ProjectDocument } from '../models'

type UpdateProject = {
  readonly data?: ProjectDocument
  readonly error?: string
}

type ProjectArgs = {
  readonly id: string
  readonly name?: string
  readonly description?: string
}

/**
 * Update project.
 * @param arg - Project object.
 */
export default async function updateProject(arg: ProjectArgs): Promise<UpdateProject> {
  const { id, ...obj } = arg
  try {
    return { data: await Project.findOneAndUpdate({ _id: id }, obj, { new: true }) }
  }
  catch (e) {
    return { error: e.message }
  }
}
