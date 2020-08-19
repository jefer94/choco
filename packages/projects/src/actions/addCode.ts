import { Code } from '../models'

type CodeArgs = {
  readonly title: string
  readonly code: string
  readonly projectId: string
}

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
