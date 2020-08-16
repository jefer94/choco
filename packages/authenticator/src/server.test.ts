import * as zmq from 'zeromq'
import server, { close } from './server'

server()
// beforeAll(async () => {
//   await server()
// })

afterAll(() => {
  close()()
  // setT
})

const token = {
  type: 'check token',
  value: 'asdasd'
}

const token2 = {
  type: 'generate token',
  username: '',
  password: ''
}

const token3 = {
  type: 'add scope',
  value: 'asdasd',
  userId: ''
}

const token4 = {
  type: 'delete scope',
  value: 'asdasd',
  userId: ''
}

const token5 = {
  type: 'register',
  username: '',
  email: '',
  password: ''
}

test('tasdasd', async () => {
  console.log('Connecting to hello world server…')

  //  Socket to talk to server
  const sock = new zmq.Request()
  sock.connect('tcp://localhost:5555')

  console.log('Sending Hello')
  await sock.send('Hello asdasdasd')
  // await sock.send('Hello')
  const [result] = await sock.receive()
  console.log('Received ', result.toString())


  // for (let i = 0; i < 2; i++) {
  //   console.log('Sending Hello ', i, sock)
  //   await sock.send(`Hello ${i} asdasdasd`)
  //   // await sock.send('Hello')
  //   const [result] = await sock.receive()
  //   console.log('Received ', result.toString(), i)
  // }
})
