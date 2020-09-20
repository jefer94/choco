import { Code, CodeDocument } from '../models'

type AddCode = {
  readonly data?: CodeDocument
  readonly error?: string
}

type CodeArgs = {
  readonly title: string
  readonly code: string
  readonly project: string
}

/**
 * Add new code.
 * @param arg - Code object.
 * @returns Was saved?.
 */
export default async function addCode(arg: CodeArgs): Promise<AddCode> {
  try {
    const code = new Code(arg)
    await code.save()
    return { data: code }
  }
  catch (e) {
    return { error: e.message }
  }
}
