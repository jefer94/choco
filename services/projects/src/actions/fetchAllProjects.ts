import { ProjectDocument, ProjectPermissionDocument } from '../models'
import fetchOwnProjects from './fetchOwnProjects'
import fetchShareProjects from './fetchShareProjects'

type FAP = {
  readonly own: readonly ProjectDocument[],
  readonly share: readonly ProjectPermissionDocument[]
}

/**
 * Fetch all projects.
 *
 * @param user - User id.
 * @returns All projects.
 */
export default async function fetchAllProjects(user: string): Promise<FAP> {
  const own = await fetchOwnProjects(user)
  const share = await fetchShareProjects(user)
  return { own, share }
}
