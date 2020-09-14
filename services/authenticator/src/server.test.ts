/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { close, requestRefs, notFound } from './server'
import db from './db'

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

const nc = NATS.connect({ json: true })
const host = 'authenticator'
const whoami = 'authenticator-test'

beforeAll(async () => {
  process.env.SECRET = 'Konan'
  const mongod = new MongoMemoryServer()
  await db(await mongod.getUri())
  await server()
})

// afterAll(() => {})
let currentToken: string

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
  expect(await subscribe(whoami)).toEqual({ error: notFound })
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
    nc.publish(host, { type: requestRefs.generateToken, ...message }, whoami)
    expect(await subscribe(whoami)).toEqual({ error: 'invalid credentials' })
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
    nc.publish(host, { type: requestRefs.register, ...message }, whoami)
    const { error, ...res } = await subscribe(whoami)
    expect(Object.keys(res)).toHaveLength(0)

    expect(/^AuthUser validation failed: (username|password|email): Path `(username|password|email)` is required\.$/.test(error))
      .toBeTruthy()
  }
})

test('Register', async () => {
  const message = {
    username: 'user',
    email: 'email',
    password: 'pass'
  }

  nc.publish(host, { type: requestRefs.register, ...message }, whoami)
  const { data, ...obj1 } = await subscribe(whoami)
  expect(Object.keys(obj1)).toHaveLength(0)

  const { token, user, ...obj2 } = data
  expect(Object.keys(obj2)).toHaveLength(0)
  expect(/^[^ ]+$/.test(token)).toBeTruthy()
  expect(/^[^ ]+$/.test(user)).toBeTruthy()
})

test('generate token', async () => {
  const message = {
    username: 'user',
    password: 'pass'
  }

  nc.publish(host, { type: requestRefs.generateToken, ...message }, whoami)
  const { data, ...obj1 } = await subscribe(whoami)
  expect(Object.keys(obj1)).toHaveLength(0)

  const { token, user, ...obj2 } = data
  expect(Object.keys(obj2)).toHaveLength(0)
  expect(/^[^ ]+$/.test(token)).toBeTruthy()
  expect(/^[^ ]+$/.test(user)).toBeTruthy()

  currentToken = token
})

test('invalid token', async () => {
  const token = 'hahahaha!'

  nc.publish(host, { type: requestRefs.checkToken, token }, whoami)

  const obj = await subscribe(whoami)
  expect(obj).toEqual({ error: 'jwt malformed' })
})

test('check token', async () => {
  nc.publish(host, { type: requestRefs.checkToken, token: currentToken }, whoami)

  const { data, ...obj } = await subscribe(whoami)
  expect(Object.keys(obj)).toHaveLength(0)

  const { exp, user, iat, ...res } = data

  expect(Object.values(res).length).toBe(0)
  expect(typeof exp === 'number').toBeTruthy()
  expect(user.length > 0).toBeTruthy()
  expect(typeof iat === 'number').toBeTruthy()
})

test('invalid delete scope', async () => {
  nc.publish(host, { type: requestRefs.deleteScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({ error: 'scope not exist' })
})

test('add scope', async () => {
  nc.publish(host, { type: requestRefs.addScope, name: 'Can edit' }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
  expect(Object.keys(obj1)).toHaveLength(0)

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()

  expect(obj2).toEqual({
    name: 'Can edit',
    users: []
  })
})

test('reject duplicate scope', async () => {
  nc.publish(host, { type: requestRefs.addScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({
    error: 'E11000 duplicate key error dup key: { : "Can edit" }'
  })
})

test('delete scope', async () => {
  nc.publish(host, { type: requestRefs.deleteScope, name: 'Can edit' }, whoami)
  expect(await subscribe(whoami)).toEqual({
    data: {
      name: 'Can edit'
    }
  })
})
