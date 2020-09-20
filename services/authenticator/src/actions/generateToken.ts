import jwt from 'jsonwebtoken'
import { AuthUser } from '../models'

type GenerateToken = {
  readonly data?: {
    readonly user: string
    readonly token: string
  }
  readonly error?: string
}

type GenerateTokenArg = {
  readonly username: string
  readonly password: string
}

/**
 * Generate token.
 * @param arg - Token object
 * @returns Token.
 */
export default async function generateToken(arg: GenerateTokenArg): Promise<GenerateToken> {
  const { username, password } = arg
  const user = await AuthUser.findOne({ $or: [arg, { email: username, password }] })

  if (user) {
    return {
      data: {
        // eslint-disable-next-line no-underscore-dangle
        user: user._id,
        token: jwt.sign({ user: user.id }, process.env.SECRET, {
          // expiresIn: 3600 * 24 * 7,
          expiresIn: '7d',
          algorithm: 'HS512'
        })
      }
    }
  }
  return { error: 'invalid credentials' }
}
