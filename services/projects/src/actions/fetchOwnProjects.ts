import { Project, ProjectDocument } from '../models'

type FOP = readonly ProjectDocument[]

/**
 * Fetch own projects.
 *
 * @param user - User id.
 * @returns Own projects.
 */
export default async function fetchOwnProjects(user: string): Promise<FOP> {
  return Project.find({ user }).exec()
}
