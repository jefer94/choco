import { ProjectDocument, ProjectPermissionDocument } from '../models'
import fetchOwnProjects from './fetchOwnProjects'
import fetchShareProjects from './fetchShareProjects'

type T = {
  readonly own: readonly ProjectDocument[],
  readonly share: readonly ProjectPermissionDocument[]
}

export default async function fetchAllProjects(user: string): Promise<T> {
  const own = await fetchOwnProjects(user)
  const share = await fetchShareProjects(user)
  return { own, share }
}
