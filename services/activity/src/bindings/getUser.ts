import { getUser as getUserFromBroker } from '../broker'

export default async function getUser(id?: string): Promise<Record<string, unknown>> {
  const user = await getUserFromBroker(id)
  return user.data || null
}
