/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import checkToken from './actions/checkToken'
import generateToken from './actions/generateToken'
import addScope from './actions/addScope'
import deleteScope from './actions/deleteScope'
import register from './actions/register'

const nc = NATS.connect({ json: true })

let sid = 0
export function close(): void {
  nc.unsubscribe(sid)
}

/** Server. */
export default async function server(): Promise<void> {
  const success = 'Success'
  const reject = 'Reject'

  sid = nc.subscribe('authenticator', async (msg, reply) => {
    if (reply) {
      const { type, ...data } = msg

      if (type === 'check token') {
        const bool = await checkToken(data.token)
        const res = {
          status: bool ? success : reject
        }
        nc.publish(reply, res)
      }
      else if (type === 'generate token') {
        const token = await generateToken(data)
        const status = { status: token ? success : reject }
        const res = token ? { ...status, token } : status
        nc.publish(reply, res)
      }
      else if (type === 'add scope') {
        const bool = await addScope(data.name)
        const res = {
          status: bool ? success : reject
        }
        nc.publish(reply, res)
      }
      else if (type === 'delete scope') {
        const bool = await deleteScope(data.name)
        const res = {
          status: bool ? success : reject
        }
        nc.publish(reply, res)
      }
      else if (type === 'register') {
        const token = await register(data)
        const status = { status: token ? success : reject }
        const res = token ? { ...status, token } : status
        nc.publish(reply, res)
      }
      else nc.publish(reply, { status: 'Not found' })
    }
  })
}
