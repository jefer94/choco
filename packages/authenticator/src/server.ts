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
  // db()
  const hasInstance = !!sock
  const success = 'success'
  const reject = 'reject'

  sock = sock || new zmq.Reply()

  if (!hasInstance) await sock.bind('tcp://*:5555')
  // closeFunc = sock.close
  // closeFunc = () => { sock.unbind('tcp://*:5555') }

  for await (const connection of sock) {
    const [msg] = connection
    const { type, ...data } = msg.toJSON()

    if (type === 'check token') {
      const bool = await checkToken(data.token)
      const res = JSON.stringify({
        status: bool ? success : reject
      })
      sock.send(res)
    }
    else if (type === 'generate token') {
      const token = await generateToken(data)
      const res = JSON.stringify({
        status: token ? success : reject,
        token
      })
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
      const res = JSON.stringify({
        status: token ? success : reject,
        token
      })
      sock.send(res)
    }
    else await sock.send('World')
    // console.log(msg.toJSON, 'json')
    // console.log('Received ' + ': [' + msg.toString() + ']')
  }
}
