import { Code } from '../models'

type CodeArgs = {
  readonly title: string
  readonly code: string
  readonly project: string
}

/**
 * Add new code.
 *
 * @param arg - Code object.
 * @returns Was saved?.
 */
export default async function addCode(arg: CodeArgs): Promise<boolean> {
  try {
    const code = new Code(arg)
    await code.save()
    return true
  }
  catch {
    return false
  }
}
