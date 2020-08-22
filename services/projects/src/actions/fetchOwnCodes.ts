import { Code, CodeDocument } from '../models'
import { Schema } from 'mongoose'

type FOC = readonly CodeDocument[]

/**
 * Fetch own codes.
 *
 * @param project - User id.
 * @returns Own codes.
 */
export default async function fetchOwnCodes(project: typeof Schema.Types.ObjectId): Promise<FOC> {
  return Code.find({ project }).exec()
}
