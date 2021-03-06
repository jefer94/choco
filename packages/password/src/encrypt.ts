import bcrypt from 'bcrypt'

type PasswordOptions = {
  readonly rounds?: number
}

/**
 * Encrypt password.
 * @param password - Password.
 * @param opts - Password options.
 * @returns Hash.
 */
export async function encrypt(password: string, opts?: PasswordOptions): Promise<string> {
  const { rounds } = { rounds: 6, ...opts }
  const salt = await bcrypt.genSalt(rounds)
  return bcrypt.hash(password, salt)
}
