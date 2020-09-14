import jwt from 'jsonwebtoken'
import { AuthUser } from '../models'

type Register = {
  readonly data?: {
    readonly user: string
    readonly token: string
  }
  readonly error?: string
}

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
export default async function register(arg: RegisterArg): Promise<Register> {
  try {
    const user = new AuthUser(arg)
    await user.save()

    return {
      data: {
        // eslint-disable-next-line no-underscore-dangle
        user: user._id,
        token: jwt.sign({ user: user.id }, process.env.SECRET, {
          expiresIn: '7d',
          algorithm: 'HS512'
        })
      }
    }
  }
  catch (e) {
    return { error: e.message }
  }
}
