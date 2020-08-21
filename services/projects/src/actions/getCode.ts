import { DocumentQuery } from 'mongoose'
import { Code, CodeDocument } from '../models'

type CodeQuery = DocumentQuery<CodeDocument, CodeDocument>

export default async function getCode(id: string): Promise<CodeQuery> {
  return Code.findOne({ _id: id })
}
