import { Token, AuthUser } from '../models'
import getToken from '../utils/generateToken'

type RegisterArg = {
  readonly username: string
  readonly email: string
  readonly password: string
};

/**
 * Register.
 *
 * @param arg - User object.
 * @returns Token.
 */
export default async function register(arg: RegisterArg): Promise<string> {
  try {
    const user = new AuthUser(arg)
    await user.save()

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
  catch (e) {
    // console.error('Register error: ', e)
    return ''
  }
}
