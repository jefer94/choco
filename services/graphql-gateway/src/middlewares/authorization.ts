import { Request as Rq, Response, NextFunction } from 'express'
import { SendCommand } from '../nats'
// import { publish, subscribe, SendCommand } from '../nats'

export enum authenticatorRefs {
  checkToken = 'check token',
  generateToken = 'generate token',
  register = 'register',
  addScope = 'add scope',
  deleteScope = 'delete scope'
}

const service = 'authenticator'

type Auth = {
  readonly user: string
  readonly exp: number
  readonly iat: number
}

export type Request = Rq & {
  // eslint-disable-next-line functional/prefer-readonly-type
  auth?: Auth
  // eslint-disable-next-line functional/prefer-readonly-type
  error?: string
}

export default async function authorization(req: Request, res: Response, next: NextFunction):
  Promise<void> {
  const token = stripToken(req.headers.authorization)

  try {
    const data = await SendCommand<Auth>(service, authenticatorRefs.checkToken, { token })
    req.auth = data
  }
  catch (e) {
    req.error = e.message
  }

  next()
}

/**
 * Get token.
 * @param token - Bearer token.
 * @returns Token.
 */
export function stripToken(token = ''): string {
  return token.replace(/^Bearer (.+)$/, '$1')
}
