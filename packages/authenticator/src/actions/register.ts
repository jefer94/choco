import { Token, AuthUser } from '../models'
import getToken from '../utils/generateToken'

type RegisterArg = {
  readonly username: string
  readonly email: string
  readonly password: string
};

export default async function register(arg: RegisterArg): Promise<string> {
  try {
    const user = new AuthUser(arg)
    await user.save()

    if (user) {
      const t = getToken()
      const token = new Token({ token: t, userId: user.id })
      await token.save()
      return t
    }
    return ''
  }
  catch {
    return ''
  }
}
