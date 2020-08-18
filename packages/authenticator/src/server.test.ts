/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import * as zmq from 'zeromq'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { close } from './server'
import db from './db'

const nc = NATS.connect({ json: true })
const host = 'authenticator'
const whoami = 'authenticator-test'

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

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

// const mongod = new MongoMemoryServer()
// process.env.MONGO_URI = await mongod.getUri()

beforeAll(async () => {
  const mongod = new MongoMemoryServer()
  await db(await mongod.getUri())
  await server()
})

afterAll(() => {
  // sock.close()
  // mongod.close()
})

function subscribe<T>(whoami: string): Promise<T> {
  return new Promise((resolve) => {
    const id = nc.subscribe(whoami, (arg1, arg2, arg3, arg4) => {
      resolve(arg1)
      nc.unsubscribe(id)
      // resolve(arg1, arg2, arg3, arg4)
    })
  })
}

const requestTypes = {
  generateToken: 'generate token',
  register: 'register',
  deleteScope: 'delete scope'
}

test('Not found', async () => {
  nc.publish(host, 'Hello asdasdasd', whoami)
  expect(await subscribe(whoami)).toEqual({ status: 'Not found' })
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
    nc.publish(host, { type: requestTypes.generateToken, ...message }, whoami)
    expect(await subscribe(whoami)).toEqual({ status: 'Reject' })
  }
})

test('Invalid register', async () => {
  const messages = [{
    username: 'user',
    password: 'pass'
  }, {
    email: 'user',
    password: 'pass'
  }, {
    username: 'user',
    email: 'pass'
  }]
  for (const message of messages) {
    nc.publish(host, { type: requestTypes.register, ...message }, whoami)
    expect(await subscribe(whoami)).toEqual({ status: 'Reject' })
  }
})

test('Register', async () => {
  const message = {
    username: 'user',
    email: 'email',
    password: 'pass'
  }

  nc.publish(host, { type: requestTypes.register, ...message }, whoami)
  const { token, ...obj } = await subscribe(whoami)
  expect(obj).toEqual({ status: 'Success' })
  const hasMoreOf60Characters = token.length > 60
  expect(hasMoreOf60Characters).toBeTruthy()
})

test('generate token', async () => {
  const message = {
    username: 'user',
    password: 'pass'
  }

  nc.publish(host, { type: requestTypes.generateToken, ...message }, whoami)
  const { token, ...obj } = await subscribe(whoami)
  expect(obj).toEqual({ status: 'Success' })
  const hasMoreOf60Characters = token.length > 60
  expect(hasMoreOf60Characters).toBeTruthy()
})
