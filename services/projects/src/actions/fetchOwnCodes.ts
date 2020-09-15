import { Code, CodeDocument } from '../models'

type FetchOwnCodes = {
  readonly data: readonly CodeDocument[]
}

/**
 * Fetch own codes.
 *
 * @param project - User id.
 * @returns Own codes.
 */
export default async function fetchOwnCodes(project: string):
  Promise<FetchOwnCodes> {
  return { data: await Code.find({ project }).lean() }
}
