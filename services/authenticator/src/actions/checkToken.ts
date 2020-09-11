import jwt from 'jsonwebtoken'

/**
 * Check token.
 *
 * @param token - Token.
 * @returns Token is valid.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default async function checkToken(token: string): Promise<string | object> {
  try {
    return jwt.verify(token, process.env.SECRET)
  }
  catch {
    return ''
  }
}
