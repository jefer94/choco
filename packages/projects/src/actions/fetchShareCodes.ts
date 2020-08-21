import { Schema } from 'mongoose'
import { Code, CodeDocument } from '../models'

type T = readonly CodeDocument[]

export default async function fetchShareCodes(project: typeof Schema.Types.ObjectId): Promise<T> {
  return Code.find({ project }).exec()
}
