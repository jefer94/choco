import { Token, AuthUser } from '../models'
import getToken from '../utils/generateToken'

type RegisterArg = {
  readonly username: string
  readonly email: string
  readonly password: string
};

export default async function register(arg: RegisterArg): Promise<string> {
  try {
    console.log('aaa111')
    const user = new AuthUser(arg)
    console.log('aaa11211111111111')
    await user.save()
    console.log('aaa112')

    if (user) {
      const t = getToken()
      console.log('aaa113')
      const token = new Token({ token: t, userId: user.id })
      console.log('aaa114')
      await token.save()
      console.log('aaa115')
      console.log('c', t)

      return t
    }
    console.log('a')
    return ''
  }
  catch(e) {
    console.log('b', e)
    return ''
  }
}
