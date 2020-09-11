import jwt from 'jsonwebtoken'
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
  const user = await AuthUser.findOne({ $or: [arg, { email: username, password }] })

  if (user) {
    return jwt.sign({
      userId: user.id,
      iat: Math.floor(Date.now() / 1000) - 30
    }, process.env.SECRET, {
      // expiresIn: 3600 * 24 * 7,
      expiresIn: '7d',
      algorithm: 'HS512'
    })
  }
  return ''
}
