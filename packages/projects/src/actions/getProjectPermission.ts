import { DocumentQuery, Document } from 'mongoose'
import { ProjectPermission } from '../models'

export default async function getProjectPermission(id: string):
  Promise<DocumentQuery<Document, Document>> {
  return ProjectPermission.findOne({ _id: id })
}
