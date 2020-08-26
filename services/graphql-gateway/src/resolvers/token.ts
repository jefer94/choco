/**
 * Get token.
 *
 * @param s - Bearer token.
 * @returns Token.
 */
export function token(s: string): string {
  return s.replace(/^Bearer (.+)$/, '$1')
}
