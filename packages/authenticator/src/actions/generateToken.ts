import { Token, AuthUser } from '../models'
import getToken from '../utils/generateToken'

type GenerateTokenArg = {
  readonly username: string
  readonly password: string
}

export default async function generateToken(arg: GenerateTokenArg): Promise<string> {
  try {
    const { username, password } = arg
    const user = AuthUser.findOne(arg).exec() ||
                 AuthUser.findOne({ email: username, password }).exec()

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