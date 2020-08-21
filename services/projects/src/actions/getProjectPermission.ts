import { DocumentQuery } from 'mongoose'
import { ProjectPermission, ProjectPermissionDocument } from '../models'

type ProjectQueryPermission = DocumentQuery<ProjectPermissionDocument, ProjectPermissionDocument>

export default async function getProjectPermission(id: string): Promise<ProjectQueryPermission> {
  return ProjectPermission.findOne({ _id: id })
}
