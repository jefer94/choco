import { Scope } from '../models'

/**
 * Delete scope.
 *
 * @param name - Scope name.
 * @returns Was deleted?.
 */
export default async function deleteScope(name: string): Promise<boolean> {
  const { deletedCount } = await Scope.deleteOne({ name })
  return !!deletedCount
}
