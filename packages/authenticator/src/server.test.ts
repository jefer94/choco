/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as zmq from 'zeromq'
import server, { close } from './server'

server()
// beforeAll(async () => {
//   await server()
// })

// afterAll(() => {
//   close()()
//   // setT
// })

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

describe('server', () => {
  let sock
  beforeAll(() => {
    sock = new zmq.Request()
    sock.connect('tcp://localhost:5555')
  })

  afterAll(() => {
    // sock.close()
  })

  test('Not found', async () => {
    await sock.send('Hello asdasdasd')
    const [result] = await sock.receive()
    expect(JSON.parse(result.toString())).toEqual({
      status: 'Not found'
    })
  })

  test('Invalid token request with username, password', async () => {
    const messages = [{
      username: 'user',
      password: 'pass'
    }, {
      username: 'user'
    }, {
      password: 'pass'
    }]
    for (const message of messages) {
      await sock.send(JSON.stringify({ type: 'generate token', ...message }))
      const [result] = await sock.receive()
      expect(JSON.parse(result.toString())).toEqual({
        status: 'Reject'
      })
    }
  })

  // test('Invalid register', async () => {
  //   const messages = [{
  //     username: 'user',
  //     password: 'pass'
  //   }, {
  //     email: 'user',
  //     password: 'pass'
  //   }, {
  //     username: 'user',
  //     email: 'pass'
  //   }]
  //   for (const message of messages) {
  //     await sock.send(JSON.stringify({ type: 'register', ...message }))
  //     const [result] = await sock.receive()
  //     expect(JSON.parse(result.toString())).toEqual({
  //       status: 'Reject'
  //     })
  //   }
  // })

  test('Register', async () => {
    const message = {
      username: 'user',
      email: 'email',
      password: 'pass'
    }
    await sock.send(JSON.stringify({ type: 'register', ...message }))
    const [result] = await sock.receive()
    expect(JSON.parse(result.toString())).toEqual({
      status: 'Success'
    })
  })
})
