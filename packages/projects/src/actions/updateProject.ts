import { Project } from '../models'

type ProjectArgs = {
  readonly id: string
  readonly name?: string
  readonly description?: string
}

export default async function updateProject(arg: ProjectArgs): Promise<void> {
  const { id, ...obj } = arg
  await Project.updateOne({ _id: id }, { $set: obj })
}
