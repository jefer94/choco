import { Scope } from '../models'

type DeleteScope = {
  readonly data?: {
    readonly name: string
  }
  readonly error?: string
}

/**
 * Delete scope.
 * @param name - Scope name.
 * @returns Was deleted?.
 */
export default async function deleteScope(name: string): Promise<DeleteScope> {
  const { deletedCount } = await Scope.deleteOne({ name })
  if (deletedCount) return { data: { name } }
  return { error: 'scope not exist' }
}
