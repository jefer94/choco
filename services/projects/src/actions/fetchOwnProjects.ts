import { Project, ProjectDocument } from '../models'

type FetchOwnProjects = {
  readonly data: readonly ProjectDocument[]
}

/**
 * Fetch own projects.
 * @param user - User id.
 * @returns Own projects.
 */
export default async function fetchOwnProjects(user: string): Promise<FetchOwnProjects> {
  return { data: await Project.find({ user }).lean() }
}
