import { ProjectPermission, ProjectPermissionDocument } from '../models'

type T = readonly ProjectPermissionDocument[]

export default async function fetchShareProjects(user: string): Promise<T> {
  const permissions = await ProjectPermission.find({ user }).populate('project').exec()
  if (!permissions.length) return permissions
  return permissions.reduce((current, { project, ...obj }) =>
    [...current, { ...project, permission: obj }], [])
}
