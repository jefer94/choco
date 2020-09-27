import { connect, JSONCodec, NatsConnection } from 'nats'

export function close(): void {
  nc.close()
}

const { decode, encode } = JSONCodec()
let nc: NatsConnection

export default async function connection(): Promise<NatsConnection> {
  if (!nc) {
    nc = await connect(process.env.BROKER ?
      { servers: process.env.BROKER } : {})
  }
  return nc
}

type Request = {
  readonly data?: Record<string, unknown>
  readonly error?: string
}

export async function getUser(id?: string): Promise<Request> {
  const msg = nc.request(process.env.AUTHENTICATOR || 'authenticator', encode({ type: 'get user', id }))
  const data: Request = decode((await msg).data)
  return data
}
