import { Scope } from "../models"

export default async function deleteScope(name: string): Promise<boolean> {
  const { deletedCount } = await Scope.deleteOne({ name })
  return !!deletedCount
}
