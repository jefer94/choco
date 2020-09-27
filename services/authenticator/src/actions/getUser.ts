import { AuthUser } from '../models'

type Register = {
  readonly data?: Record<string, unknown>
  readonly error?: string
}

/**
 * Register.
 * @param arg - User object.
 * @returns Token.
 */
export default async function register(id: string): Promise<Register> {
  const user = await AuthUser.findOne({ _id: id }).select('-password').populate('scopes').lean()
  if (user) return { data: user }
  return { error: 'user not found' }
}
