import { AuthUser, AuthUserDocument } from '../models'

type Register = {
  readonly data?: AuthUserDocument
  readonly error?: string
}

/**
 * Register.
 * @param arg - User object.
 * @returns Token.
 */
export default async function register(id: string): Promise<Register> {
  const user = await AuthUser.findOne({ _id: id }).select('-password').populate('scopes').exec()
  if (user) return { data: user }
  return { error: 'user not found' }
}
