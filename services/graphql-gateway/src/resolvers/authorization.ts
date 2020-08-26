import { serviceRefs, activityRefs, publish, subscribe, statusRefs } from '../nats'

export enum roleRefs {
  owner = 'owner',
  admin = 'admin',
  user = 'user',
}

type Token = {
  readonly status: string
}

export default async function authorization(s?: string): Promise<boolean> {
  if (!s) return false
  const token = stripToken(s)
  const channel = publish(serviceRefs.activity, activityRefs.addOnceActivity, { token })
  const response = await subscribe<Token>(channel)
  return response.status === statusRefs.success
}

/**
 * Get token.
 *
 * @param token - Bearer token.
 * @returns Token.
 */
export function stripToken(token: string): string {
  return token.replace(/^Bearer (.+)$/, '$1')
}
