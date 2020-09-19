/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, NatsConnection, JSONCodec, StringCodec } from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { close, requestRefs, notFound, host } from './server'
import db from './db'

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let nc: NatsConnection
const { decode, encode } = JSONCodec()

beforeAll(async () => {
  process.env.SECRET = 'Konan'
  const mongod = new MongoMemoryServer()
  await db(await mongod.getUri())
  nc = await connect()
  await server()
})

// afterAll(() => {})
let currentToken: string

type Data = Record<string, unknown> & {
  readonly _id?: string
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly service?: string
  readonly activity?: string
  readonly user?: string
}
type Request<T> = {
  readonly data?: T
  readonly error?: string
}

export async function SendCommand<T>(action: string, message?: Data):
  Promise<T | Data> {
  const obj = message || {}
  const msg = nc.request(host, encode({ type: action, ...obj }), { timeout: 5000 })
  const data: Request<T | Data> = decode((await msg).data)
  return data
}

test('Not found', async () => {
  const msg = nc.request(host, StringCodec().encode('Hello asdasdasd'))
  expect(decode((await msg).data)).toEqual({ error: notFound })
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
    const msg = await SendCommand(requestRefs.generateToken, message)
    expect(msg).toEqual({ error: 'invalid credentials' })
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
    const { error, ...res } = await SendCommand(requestRefs.register, message)
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

  const { data, ...obj1 } = await SendCommand(requestRefs.register, message)
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

  const { data, ...obj1 } = await SendCommand(requestRefs.generateToken, message)
  expect(Object.keys(obj1)).toHaveLength(0)

  const { token, user, ...obj2 } = data
  expect(Object.keys(obj2)).toHaveLength(0)
  expect(/^[^ ]+$/.test(token)).toBeTruthy()
  expect(/^[^ ]+$/.test(user)).toBeTruthy()

  currentToken = token
})

test('invalid token', async () => {
  const token = 'hahahaha!'

  const msg = await SendCommand(requestRefs.checkToken, { token })
  expect(msg).toEqual({ error: 'jwt malformed' })
})

test('check token', async () => {
  const { data, ...obj } = await SendCommand(requestRefs.checkToken, { token: currentToken })
  expect(Object.keys(obj)).toHaveLength(0)

  const { exp, user, iat, ...res } = data

  expect(Object.values(res).length).toBe(0)
  expect(typeof exp === 'number').toBeTruthy()
  expect(user.length > 0).toBeTruthy()
  expect(typeof iat === 'number').toBeTruthy()
})

test('invalid delete scope', async () => {
  const msg = await SendCommand(requestRefs.deleteScope, { name: 'Can edit' })
  expect(msg).toEqual({ error: 'scope not exist' })
})

test('add scope', async () => {
  const { data, ...obj1 } = await SendCommand(requestRefs.addScope, { name: 'Can edit' })
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
  const msg = await SendCommand(requestRefs.addScope, { name: 'Can edit' })
  expect(msg).toEqual({
    error: 'E11000 duplicate key error dup key: { : "Can edit" }'
  })
})

test('delete scope', async () => {
  const msg = await SendCommand(requestRefs.deleteScope, { name: 'Can edit' })
  expect(msg).toEqual({
    data: {
      name: 'Can edit'
    }
  })
})
