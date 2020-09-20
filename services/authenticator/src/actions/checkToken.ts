import jwt from 'jsonwebtoken'

type CheckToken = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly data?: object | string
  readonly error?: string
}

/**
 * Check token.
 * @param token - Token.
 * @returns Token is valid.
 */
export default async function checkToken(token: string): Promise<CheckToken> {
  try {
    return { data: jwt.verify(token, process.env.SECRET) }
  }
  catch (e) {
    return { error: e.message }
  }
}
