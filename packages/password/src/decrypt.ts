import bcrypt from 'bcrypt'

/**
 * Decrypt password.
 *
 * @param {string} password - Password.
 * @param {string} hash - Hash.
 * @returns {Promise<boolean>} Is the correct password.
 */
export function decrypt(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
