import { Project, ProjectDocument } from '../models'

type T = readonly ProjectDocument[]

export default async function fetchOwnProjects(user: string): Promise<T> {
  return Project.find({ user }).exec()
}
