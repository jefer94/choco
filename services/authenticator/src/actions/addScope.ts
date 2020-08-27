import { Scope } from '../models'

/**
 * Add scope.
 *
 * @param name - Scope name.
 * @returns Was added?.
 */
export default async function addScope(name: string): Promise<boolean> {
  try {
    const scope = new Scope({ name })
    await scope.save()
    return true
  }
  catch {
    return false
  }
}