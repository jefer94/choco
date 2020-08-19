import { Code } from '../models'

export default async function deleteCode(id: string): Promise<boolean> {
  const { deletedCount } = await Code.deleteOne({ _id: id })
  return !!deletedCount
}
