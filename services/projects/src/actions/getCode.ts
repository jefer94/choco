import { Code, CodeFields } from '../models'

type GetCode = {
  readonly data: CodeFields
}

/**
 * Get code.
 *
 * @param id - Code id.
 * @returns Code object.
 */
export default async function getCode(id: string): Promise<GetCode> {
  return { data: await Code.findOne({ _id: id }).lean() }
}
