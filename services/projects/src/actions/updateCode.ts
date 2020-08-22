import { Code } from '../models'

type CodeArgs = {
  readonly id: string
  readonly title?: string
  readonly code?: string
}

/**
 * Update code.
 *
 * @param arg - Code object.
 */
export default async function updateCode(arg: CodeArgs): Promise<void> {
  const { id, ...obj } = arg
  await Code.updateOne({ _id: id }, { $set: obj })
}
