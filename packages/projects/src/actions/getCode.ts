import { DocumentQuery, Document } from 'mongoose'
import { Code } from '../models'

export default async function getCode(id: string): Promise<DocumentQuery<Document, Document>> {
  return Code.findOne({ _id: id })
}
