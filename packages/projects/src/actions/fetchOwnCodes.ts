import { Code, CodeDocument } from '../models'
import { Schema } from 'mongoose'

type T = readonly CodeDocument[]

export default async function fetchOwnCodes(project: typeof Schema.Types.ObjectId): Promise<T> {
  return Code.find({ project }).exec()
}
