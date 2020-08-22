import { Schema } from 'mongoose'
import { Code, CodeDocument } from '../models'

type FSC = readonly CodeDocument[]

/**
 * Fetch share codes.
 *
 * @param project - User id.
 * @returns Share codes.
 */
export default async function fetchShareCodes(project: typeof Schema.Types.ObjectId): Promise<FSC> {
  return Code.find({ project }).exec()
}
