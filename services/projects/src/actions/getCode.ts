import { Code, CodeDocument } from '../models'

/**
 * Get code.
 *
 * @param id - Code id.
 * @returns Code object.
 */
export default async function getCode(id: string): Promise<CodeDocument> {
  return Code.findOne({ _id: id }).exec()
}
