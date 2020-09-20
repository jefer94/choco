import { Code, CodeDocument } from '../models'

type UpdateCode = {
  readonly data?: CodeDocument
  readonly error?: string
}

type CodeArgs = {
  readonly id: string
  readonly title?: string
  readonly code?: string
}

/**
 * Update code.
 * @param arg - Code object.
 */
export default async function updateCode(arg: CodeArgs): Promise<UpdateCode> {
  const { id, ...obj } = arg
  try {
    return { data: await Code.findOneAndUpdate({ _id: id }, obj, { new: true }) }
  }
  catch (e) {
    return { error: e.message }
  }
}
