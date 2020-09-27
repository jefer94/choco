import { Scope, ScopeDocument } from '../models'

type AddScope = {
  readonly data?: ScopeDocument
  readonly error?: string
}

/**
 * Add scope.
 * @param name - Scope name.
 * @returns Was added?.
 */
export default async function addScope(name: string): Promise<AddScope> {
  try {
    const scope = new Scope({ name })
    await scope.save()
    scope.populate('users', '-password')
    return { data: scope }
  }
  catch (e) {
    return { error: e.message }
  }
}
