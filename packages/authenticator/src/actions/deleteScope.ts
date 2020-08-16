import { Scope } from "../models"

export default async function deleteScope(name: string): Promise<boolean> {
  try {
    await Scope.deleteOne({ name })
    return true
  }
  catch {
    return false
  }
}
