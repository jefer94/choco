import { ProjectPermission, ProjectPermissionDocument } from '../models'

type FSP = readonly ProjectPermissionDocument[]

/**
 * Fetch share projects.
 *
 * @param user - User id.
 * @returns Share projects.
 */
export default async function fetchShareProjects(user: string): Promise<FSP> {
  const permissions = await ProjectPermission.find({ user }).populate('project').exec()
  if (!permissions.length) return permissions
  return permissions.reduce((current, { project, ...obj }) =>
    [...current, { ...project, permission: obj }], [])
}
