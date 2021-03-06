/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, JSONCodec } from 'nats'
import checkToken from './actions/checkToken'
import generateToken from './actions/generateToken'
import addScope from './actions/addScope'
import deleteScope from './actions/deleteScope'
import register from './actions/register'
import getUser from './actions/getUser'

// let sid = 0
export const host = 'authenticator'
export function close(): void {
  // nc.unsubscribe(sid)
}

export enum actions {
  checkToken = 'check token',
  generateToken = 'generate token',
  register = 'register',
  addScope = 'add scope',
  deleteScope = 'delete scope',
  getUser = 'get user'
}

export const notFound = 'command not found'

/** Server. */
export default async function server(): Promise<void> {
  const nc = await connect(process.env.BROKER ?
    { servers: process.env.BROKER } : {})

  nc.subscribe(host, { callback: async (error, msg) => {
    const { decode, encode } = JSONCodec()
    const { reply, data } = msg

    if (reply) {
      try {
        const { type, ...request } = decode(data)

        if (type === actions.checkToken) {
          nc.publish(reply, encode(await checkToken(request.token)))
        }
        else if (type === actions.generateToken) {
          nc.publish(reply, encode(await generateToken(request)))
        }
        else if (type === actions.addScope) {
          nc.publish(reply, encode(await addScope(request.name)))
        }
        else if (type === actions.deleteScope) {
          nc.publish(reply, encode(await deleteScope(request.name)))
        }
        else if (type === actions.register) {
          nc.publish(reply, encode(await register(request)))
        }
        else if (type === actions.getUser) {
          nc.publish(reply, encode(await getUser(request.id)))
        }
      }
      catch (e) { console.log(e.message); nc.publish(reply, encode({ error: notFound })) }
    }
  } })
}
