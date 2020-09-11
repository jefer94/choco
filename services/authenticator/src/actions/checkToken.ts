import jwt from 'jsonwebtoken'

/**
 * Check token.
 *
 * @param token - Token.
 * @returns Token is valid.
 */
export default async function checkToken(token: string): Promise<boolean> {
  try {
    return !!jwt.verify(token, process.env.SECRET)
  }
  catch {
    return false
  }
}
