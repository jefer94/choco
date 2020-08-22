import { Code } from '../models'

/**
 * Delete code.
 *
 * @param id - Code id.
 * @returns Was delete.
 */
export default async function deleteCode(id: string): Promise<boolean> {
  const { deletedCount } = await Code.deleteOne({ _id: id })
  return !!deletedCount
}
