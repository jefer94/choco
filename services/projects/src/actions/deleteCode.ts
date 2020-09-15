import { Code, CodeDocument } from '../models'

type DeleteScope = {
  readonly data?: CodeDocument
  readonly error?: string
}

/**
 * Delete code.
 *
 * @param id - Code id.
 * @returns Was delete.
 */
export default async function deleteCode(id: string): Promise<DeleteScope> {
  return { data: await Code.findOneAndDelete({ _id: id }) }
}
