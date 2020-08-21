import { Token } from '../models'

export default async function checkProject(token: string): Promise<boolean> {
  return !!await Token.findOne({ token }).exec()
}
