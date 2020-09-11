/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { close } from './server'
import db from './db'

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

const nc = NATS.connect({ json: true })
const host = 'authenticator'
const whoami = 'authenticator-test'

enum requestTypes {
  checkToken = 'check token',
  generateToken = 'generate token',
  register = 'register',
  addScope = 'add scope',
  deleteScope = 'delete scope'
}

enum status {
  success = 'Success',
  reject = 'Reject',
  notFound = 'Not found'
}

beforeAll(async () => {
  process.env.SECRET = 'Konan'
  const mongod = new MongoMemoryServer()
  await db(await mongod.getUri())
  await server()
})

// afterAll(() => {})

function subscribe<T>(whoami: string): Promise<T> {
  return new Promise((resolve) => {
    const id = nc.subscribe(whoami, (msg) => {
      resolve(msg)
      nc.unsubscribe(id)
    })
  })
}

test('Not found', async () => {
  nc.publish(host, 'Hello asdasdasd', whoami)
  expect(await subscribe(whoami)).toEqual({ status: status.notFound })
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
    expect(await subscribe(whoami)).toEqual({ status: status.reject })
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
    expect(await subscribe(whoami)).toEqual({ status: status.reject })
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
  expect(obj).toEqual({ status: status.success })
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
  expect(obj).toEqual({ status: status.success })
  const hasMoreOf60Characters = token.length > 60
  expect(hasMoreOf60Characters).toBeTruthy()
})

test('invalid token', async () => {
  const token = 'hahahaha!'

  nc.publish(host, { type: requestTypes.checkToken, token }, whoami)

  const obj = await subscribe(whoami)
  expect(obj).toEqual({ status: status.reject })
})

test('check token', async () => {
  const message = {
    username: 'user',
    password: 'pass'
  }

  nc.publish(host, { type: requestTypes.generateToken, ...message }, whoami)
  const { token } = await subscribe(whoami)

  nc.publish(host, { type: requestTypes.checkToken, token }, whoami)

  const obj = await subscribe(whoami)
  expect(obj).toEqual({ status: status.success })
})

test('invalid delete scope', async () => {
  nc.publish(host, { type: requestTypes.deleteScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: status.reject })
})

test('add scope', async () => {
  nc.publish(host, { type: requestTypes.addScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: status.success })
})

test('reject duplicate scope', async () => {
  nc.publish(host, { type: requestTypes.addScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: status.reject })
})

test('delete scope', async () => {
  nc.publish(host, { type: requestTypes.deleteScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: status.success })
})
