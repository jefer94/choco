import { Token } from '../models'

export default async function checkProjectPermission(token: string): Promise<boolean> {
  return !!await Token.findOne({ token }).exec()
}
