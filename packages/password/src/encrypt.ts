import bcrypt from 'bcrypt'

/**
 * @typedef {object} PasswordOptions
 * @property {number} rounds - Rounds.
 */

type PasswordOptions = {
  readonly rounds?: number
}

/**
 * Encrypt password.
 *
 * @param {string} password - Password.
 * @param {PasswordOptions} opts - Password options.
 * @returns {Promise<string>} Hash.
 */
export async function encrypt(password: string, opts?: PasswordOptions): Promise<string> {
  const { rounds } = { rounds: 6, ...opts }
  const salt = await bcrypt.genSalt(rounds)
  return bcrypt.hash(password, salt)
}
