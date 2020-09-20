import { ProjectPermission } from '../models'

export type PermissionFieldsRes = {
  readonly permission: {
    readonly write?: boolean
    readonly create?: boolean
    readonly delete?: boolean
  }
}

export type ProjectFieldsRes = {
  readonly user: string
  readonly name: string
  readonly description: string
}

type PermissionQueryRes = ProjectFieldsRes & PermissionFieldsRes

type PermissionQuery = {
  readonly _id: string
  readonly write?: boolean
  readonly create?: boolean
  readonly delete?: boolean
  readonly project: ProjectFieldsRes
  readonly createdAt: string
  readonly updatedAt: string
}

type FetchShareProjects = {
  readonly data: readonly PermissionQueryRes[]
}

/**
 * Fetch share projects.
 * @param user - User id.
 * @returns Share projects.
 */
export default async function fetchShareProjects(user: string): Promise<FetchShareProjects> {
  // const permissions = await ProjectPermission.find({ user }).populate('project').exec()
  const permissions: readonly PermissionQuery[] = await ProjectPermission.find({ user })
    // .populate([
    //   { path: 'project', model: 'Project', select: 'user' },
    //   { path: 'project', model: 'Project', select: 'name' },
    //   { path: 'project', model: 'Project', select: 'description' }
    // ])
    .populate('project')
    .lean()

  return { data: permissions.reduce((current, { project, _id, createdAt, updatedAt, ...obj }) =>
    [...current, { ...project, _id, createdAt, updatedAt, permission: obj }], []) }
}
