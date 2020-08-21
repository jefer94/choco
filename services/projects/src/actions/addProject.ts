import { Project } from '../models'

type ProjectArgs = {
  readonly name: string
  readonly description: string
  readonly user: string
}

export default async function addProject(obj: ProjectArgs): Promise<boolean> {
  try {
    const scope = new Project(obj)
    await scope.save()
    return true
  }
  catch {
    return false
  }
}
