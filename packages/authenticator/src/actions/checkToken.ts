import { Token } from "../models"

export default async function checkToken(token: string): Promise<boolean> {
  return !!await Token.findOne({ token }).exec()
}
