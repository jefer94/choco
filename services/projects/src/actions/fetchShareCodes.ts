import { Code, CodeDocument } from '../models'

type FetchShareCodes = {
  readonly data: readonly CodeDocument[]
}

/**
 * Fetch share codes.
 *
 * @param project - User id.
 * @returns Share codes.
 */
export default async function fetchShareCodes(project: string): Promise<FetchShareCodes> {
  return { data: await Code.find({ project }).lean() }
}
