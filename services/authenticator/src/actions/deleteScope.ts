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
  const scope = await Scope.findOneAndRemove({ name }).lean().populate('users', '-password')
  if (scope) return { data: scope }
  return { error: 'scope not exist' }
}
