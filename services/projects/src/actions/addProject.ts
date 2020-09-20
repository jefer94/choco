import { Project, ProjectDocument } from '../models'

type AddProject = {
  readonly data?: ProjectDocument
  readonly error?: string
}

type ProjectArgs = {
  readonly name: string
  readonly description: string
  readonly user: string
}

/**
 * Add new project.
 * @param obj - Projects object.
 * @returns Was added project.
 */
export default async function addProject(obj: ProjectArgs): Promise<AddProject> {
  try {
    const scope = new Project(obj)
    await scope.save()
    return { data: scope }
  }
  catch (e) {
    return { error: e.message }
  }
}
