import { Token } from '../models'

/**
 * Check token.
 *
 * @param token - Token.
 * @returns Token is valid.
 */
export default async function checkToken(token: string): Promise<boolean> {
  return !!await Token.findOne({ token }).exec()
}
