import bcrypt from 'bcrypt'

/**
 * Decrypt password.
 *
 * @param password - Password.
 * @param hash - Hash.
 * @returns Is the correct password.
 */
export function decrypt(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
