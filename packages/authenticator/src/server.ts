/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as zmq from 'zeromq'
import db from './db'
import checkToken from './actions/checkToken'
import generateToken from './actions/generateToken'
import addScope from './actions/addScope'
import deleteScope from './actions/deleteScope'
import register from './actions/register'

let closeFunc = (): void => {}
let sock
export function close(): typeof closeFunc {
  return closeFunc
}

export default async function server() {
  await db()
  const hasInstance = !!sock
  const success = 'Success'
  const reject = 'Reject'

  sock = sock || new zmq.Reply()

  if (!hasInstance) await sock.bind('tcp://*:5555')
  // closeFunc = sock.close
  // closeFunc = () => { sock.unbind('tcp://*:5555') }

  for await (const connection of sock) {
    const [msg] = connection
    try {
      const { type, ...data } = JSON.parse(msg.toString())

      if (type === 'check token') {
        const bool = await checkToken(data.token)
        const res = JSON.stringify({
          status: bool ? success : reject
        })
        sock.send(res)
      }
      else if (type === 'generate token') {
        const token = await generateToken(data)
        const status = { status: token ? success : reject }
        const res = JSON.stringify(token ? { ...status, token } : status)
        sock.send(res)
      }
      else if (type === 'add scope') {
        const bool = await addScope(data.name)
        const res = JSON.stringify({
          status: bool ? success : reject
        })
        sock.send(res)
      }
      else if (type === 'delete scope') {
        const bool = await deleteScope(data.name)
        const res = JSON.stringify({
          status: bool ? success : reject
        })
        sock.send(res)
      }
      else if (type === 'register') {
        const token = await register(data)
        const status = { status: token ? success : reject }
        const res = JSON.stringify(token ? { ...status, token } : status)
        sock.send(res)
      }
      else await sock.send(JSON.stringify({ status: 'Not found' }))
    }
    catch { await sock.send(JSON.stringify({ status: 'Not found' })) }
  }
}
