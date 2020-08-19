import { DocumentQuery, Document } from 'mongoose'
import { Project } from '../models'

export default async function getProject(id: string): Promise<DocumentQuery<Document, Document>> {
  return Project.findOne({ _id: id })
}
