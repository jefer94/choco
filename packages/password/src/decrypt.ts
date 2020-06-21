import bcrypt from 'bcrypt'

export function decrypt(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
