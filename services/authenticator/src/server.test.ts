/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, NatsConnection, JSONCodec, StringCodec } from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { close, actions, notFound, host } from './server'
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
let userId1: string

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
  const msg = nc.request(host, encode({ type: action, ...obj }))
  const data: Request<T | Data> = decode((await msg).data)
  return data
}

type GenericType = {
  readonly _id: string
  readonly createdAt: string
  readonly updatedAt: string
}

type ActivityType = GenericType & {
}

type ServiceType = GenericType & {
}

function genericTest(obj: GenericType, id?: string): void {
  const { _id, createdAt, updatedAt } = obj
  if (id) expect(_id).toBe(id)
  else expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
}

async function testScope(data: ActivityType, id?: string): Promise<void> {
  const { _id, createdAt, updatedAt, ...obj2 } = data
  genericTest({ _id, createdAt, updatedAt })

  expect(obj2).toEqual({
    name: 'Can edit',
    users: []
  })
}

async function testUser(data: ActivityType, id?: string): Promise<void> {
  const { _id, createdAt, updatedAt, ...obj2 } = data
  genericTest({ _id, createdAt, updatedAt })

  expect(obj2).toEqual({
    username: 'user',
    email: 'email',
    scopes: []
  })
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
    const msg = await SendCommand(actions.generateToken, message)
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
    const { error, ...res } = await SendCommand(actions.register, message)
    expect(Object.keys(res)).toHaveLength(0)

    expect(/^AuthUser validation failed: (username|password|email): Path `(username|password|email)` is required\.$/.test(error))
      .toBeTruthy()
  }
})

test('Get invalid user', async () => {
  const message = {
    id: '5f6a6a50aa5403d558a33edb'
  }
  const msg = await SendCommand(actions.getUser, message)
  expect(msg).toEqual({ error: 'user not found' })
})

test('Register', async () => {
  const message = {
    username: 'user',
    email: 'email',
    password: 'pass'
  }

  const { data, ...obj1 } = await SendCommand(actions.register, message)
  expect(Object.keys(obj1)).toHaveLength(0)

  const { token, user, ...obj2 } = data
  expect(Object.keys(obj2)).toHaveLength(0)
  expect(/^[^ ]+$/.test(token)).toBeTruthy()
  expect(/^[^ ]+$/.test(user)).toBeTruthy()
  userId1 = user
})

test('Generate token', async () => {
  const message = {
    username: 'user',
    password: 'pass'
  }

  const { data, ...obj1 } = await SendCommand(actions.generateToken, message)
  expect(Object.keys(obj1)).toHaveLength(0)

  const { token, user, ...obj2 } = data
  expect(Object.keys(obj2)).toHaveLength(0)
  expect(/^[^ ]+$/.test(token)).toBeTruthy()
  expect(/^[^ ]+$/.test(user)).toBeTruthy()

  currentToken = token
})

test('invalid token', async () => {
  const token = 'hahahaha!'

  const msg = await SendCommand(actions.checkToken, { token })
  expect(msg).toEqual({ error: 'jwt malformed' })
})

test('check token', async () => {
  const { data, ...obj } = await SendCommand(actions.checkToken, { token: currentToken })
  expect(Object.keys(obj)).toHaveLength(0)

  const { exp, user, iat, ...res } = data

  expect(Object.values(res).length).toBe(0)
  expect(typeof exp === 'number').toBeTruthy()
  expect(user.length > 0).toBeTruthy()
  expect(typeof iat === 'number').toBeTruthy()
})

test('invalid delete scope', async () => {
  const msg = await SendCommand(actions.deleteScope, { name: 'Can edit' })
  expect(msg).toEqual({ error: 'scope not exist' })
})

test('add scope', async () => {
  const { data, ...obj1 } = await SendCommand(actions.addScope, { name: 'Can edit' })
  expect(Object.keys(obj1)).toHaveLength(0)
  testScope(data)
})

test('reject duplicate scope', async () => {
  const msg = await SendCommand(actions.addScope, { name: 'Can edit' })
  expect(msg).toEqual({
    error: 'E11000 duplicate key error dup key: { : "Can edit" }'
  })
})

test('delete scope', async () => {
  const { data, ...obj1 } = await SendCommand(actions.deleteScope, { name: 'Can edit' })
  expect(Object.keys(obj1)).toHaveLength(0)
  testScope(data)
})

test('Get user', async () => {
  const message = {
    id: userId1
  }
  const { data, ...obj1 } = await SendCommand(actions.getUser, message)
  expect(Object.keys(obj1)).toHaveLength(0)
  testUser(data)
})
