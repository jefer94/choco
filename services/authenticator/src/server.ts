/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import checkToken from './actions/checkToken'
import generateToken from './actions/generateToken'
import addScope from './actions/addScope'
import deleteScope from './actions/deleteScope'
import register from './actions/register'

const nc = NATS.connect(process.env.BROKER ?
  { json: true, url: process.env.BROKER } : { json: true })

let sid = 0
export function close(): void {
  nc.unsubscribe(sid)
}

export enum requestRefs {
  checkToken = 'check token',
  generateToken = 'generate token',
  register = 'register',
  addScope = 'add scope',
  deleteScope = 'delete scope'
}

export const notFound = 'command not found'

/** Server. */
export default async function server(): Promise<void> {
  sid = nc.subscribe('authenticator', async (msg, reply) => {
    if (reply) {
      const { type, ...data } = msg

      if (type === requestRefs.checkToken) nc.publish(reply, await checkToken(data.token))
      else if (type === requestRefs.generateToken) nc.publish(reply, await generateToken(data))
      else if (type === requestRefs.addScope) nc.publish(reply, await addScope(data.name))
      else if (type === requestRefs.deleteScope) nc.publish(reply, await deleteScope(data.name))
      else if (type === requestRefs.register) nc.publish(reply, await register(data))
      else nc.publish(reply, { error: 'command not found' })
    }
  })
}
