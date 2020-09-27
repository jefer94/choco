import { JSONCodec } from 'nats'
import connection from './broker'

export const notFound = 'command not found'
export enum authActions {
  getUser = 'get user'
}

const users = {
  '5f40c309bd73600bcc1cd207': {
    _id: '5f40c309bd73600bcc1cd207',
    username: 'Konan',
    email: 'konan@at.dot.com',
    scopes: []
  }
}

async function getUser(id?: string): Promise<Record<string, unknown>> {
  return { data: users[id] || null }
}

export default async function authenticatorMock(): Promise<void> {
  const host = process.env.AUTHENTICATOR || 'authenticator'
  const nc = await connection()

  nc.subscribe(host, { callback: async (err, msg) => {
    const { decode, encode } = JSONCodec()
    const { reply, data } = msg

    if (reply) {
      try {
        const { type, ...request } = decode(data)

        if (type === authActions.getUser) {
          nc.publish(reply, encode(await getUser(request.id)))
        }
      }
      catch { nc.publish(reply, encode({ error: notFound })) }
    }
  } })
}
