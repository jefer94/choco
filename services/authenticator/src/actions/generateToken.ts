import { Token, AuthUser } from '../models'
import getToken from '../utils/generateToken'

type GenerateTokenArg = {
  readonly username: string
  readonly password: string
}

/**
 * Generate token.
 *
 * @param arg - Token object
 * @returns Token.
 */
export default async function generateToken(arg: GenerateTokenArg): Promise<string> {
  const { username, password } = arg
  const user = await AuthUser.findOne(arg).exec() ||
               await AuthUser.findOne({ email: username, password }).exec()

  if (user) {
    const t = getToken()
    const token = new Token({
      token: t,
      userId: user.id,
      exp: Date.now(),
      active: true
    })
    await token.save()
    return t
  }
  return ''
}
