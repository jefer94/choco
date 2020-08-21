import crypto from 'crypto'

/**
 * Generate token.
 *
 * @returns {string} Token.
 */
export default function generateToken(): string {
  const rand = crypto.randomBytes(28).toString('base64')
  const timestamp = Date.now().toString()
  const hash = crypto.createHash('md5').update(timestamp).digest('base64')
  return `${hash}/${rand}`
}
