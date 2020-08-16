import { Token } from "../models"

export default async function checkToken(token: string): Promise<boolean> {
  try {
    return !!await Token.findOne({ token }).exec()
  }
  catch {
    return false
  }
}
