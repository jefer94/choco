import { Token } from '../models'

export default async function checkCode(token: string): Promise<boolean> {
  return !!await Token.findOne({ token }).exec()
}
