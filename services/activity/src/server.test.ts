/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, NatsConnection, JSONCodec, StringCodec } from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { host, actions, notFound, close } from './server'
import authenticatorMock, { closeAuthenticatorMock } from './mocks/authenticatorMock'
import db from './db'

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let nc: NatsConnection
const { decode, encode } = JSONCodec()

// const mongod = new MongoMemoryServer()
// process.env.MONGO_URI = await mongod.getUri()

beforeAll(async () => {
  const mongod = new MongoMemoryServer()
  await db(await mongod.getUri())
  nc = await connect()
  await authenticatorMock()
  await server()
})

afterAll(() => {
  closeAuthenticatorMock()
  close()
  // sock.close()
  // mongod.close()
})

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

const henriettaUser = {
  _id: '5f40c309bd73600bcc1cd207',
  username: 'Konan',
  email: 'konan@at.dot.com',
  scopes: []
}

const henrietta = '5f40c309bd73600bcc1cd207'
const dayan = '5f40c36401ba680924cb0afb'
const todd = '5f40c3705bea251f8289f4ed'
const service1 = 'algorithm'
const service2 = 'killer'

let serviceId1
let activityId1
let activityLogId1

type Generic = {
  readonly _id: string
  readonly createdAt: string
  readonly updatedAt: string
}

type Activity = Generic & {
  readonly name: string
  readonly activityLogs: readonly unknown[]
  readonly service: Service
}

type Service = Generic & {
  readonly name: string
  readonly activities: readonly Activity[]
}

function genericTest(obj: Generic, id?: string): void {
  const { _id, createdAt, updatedAt } = obj
  if (id) expect(_id).toBe(id)
  else expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
}

function testService(obj: Service, id?: string): void {
  const { _id, createdAt, updatedAt, ...res } = obj

  genericTest({ _id, createdAt, updatedAt })
  expect(res).toEqual({
    activities: [],
    name: 'algorithm'
  })
}

function testActivity(obj: Activity, id?: string): void {
  const { _id, createdAt, updatedAt, service, ...res } = obj

  genericTest({ _id, createdAt, updatedAt })
  testService(service)
  expect(res).toEqual({
    activityLogs: [],
    name: 'Is henrietta'
  })
}

test('Not found', async () => {
  const msg = nc.request(host, StringCodec().encode('Hello asdasdasd'))
  expect(decode((await msg).data)).toEqual({ error: notFound })
})

test('fetch nobody', async () => {
  const msg = await SendCommand(actions.fetchAllActivities)
  expect(msg).toEqual({ data: [] })
})

test('fetch all nobody', async () => {
  const msg = await SendCommand(actions.fetchActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})

test('add once service', async () => {
  const { data, ...obj } = await SendCommand(actions.addOnceService, { name: service1 })
  expect(Object.keys(obj)).toHaveLength(0)
  testService(data)
  serviceId1 = data._id
})

test('add once service again', async () => {
  const { data, ...obj } = await SendCommand(actions.addOnceService, { name: service1 })
  expect(Object.keys(obj)).toHaveLength(0)
  testService(data)
})

test('check that fetch nothing 1', async () => {
  const msg = await SendCommand(actions.fetchActivities)
  expect(msg).toEqual({ data: [] })
})

test('check that fetch all nothing 1', async () => {
  const msg = await SendCommand(actions.fetchAllActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})

test('add once activity', async () => {
  const message = {
    name: 'Is henrietta',
    service: serviceId1
  }
  const { data, ...obj } = await SendCommand(actions.addOnceActivity, message)

  expect(Object.keys(obj)).toHaveLength(0)
  const { _id, createdAt, updatedAt, service, ...rest } = data

  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(/^[^ ]+$/.test(service)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(rest).toEqual({ name: 'Is henrietta', activityLogs: [] })
  activityId1 = _id
})

test('add once activity again', async () => {
  const message = {
    name: 'Is henrietta',
    service: serviceId1
  }
  const { data, ...obj } = await SendCommand(actions.addOnceActivity, message)

  expect(Object.keys(obj)).toHaveLength(0)
  testActivity(data)
})

test('check that fetch nothing 2', async () => {
  const msg = await SendCommand(actions.fetchAllActivities)
  expect(msg).toEqual({ data: [] })
})

test('check that fetch all nothing 2', async () => {
  const msg = await SendCommand(actions.fetchActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})

test('add one activity in log', async () => {
  const message = {
    user: henrietta,
    activity: activityId1
  }
  const { data, ...obj } = await SendCommand(actions.addActivityLog, message)

  expect(Object.keys(obj)).toHaveLength(0)
  const { _id, createdAt, updatedAt, activity, user, ...rest } = data

  expect(Object.keys(rest)).toHaveLength(0)
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(/^[^ ]+$/.test(activity)).toBeTruthy()
  expect(user).toEqual(henriettaUser)
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
})

function checkActivitySubsection(obj: Record<string, any>): void {
  const { _id, createdAt, updatedAt, service, ...obj2 } = obj

  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(_id).toBe(activityId1)
  expect(service).toBe(serviceId1)
  expect(obj2).toEqual({ name: 'Is henrietta', activityLogs: [] })
}

test('check fetch with content', async () => {
  const { data, ...obj1 } = await SendCommand(actions.fetchAllActivities)
  const [current, ...less] = data
  const { _id, createdAt, updatedAt, activity, user, ...obj2 } = current

  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(/^[a-zA-Z0-9]+$/.test(_id)).toBeTruthy()
  expect(user).toEqual(henriettaUser)
  expect(obj1).toEqual({})
  expect(obj2).toEqual({})
  expect(less).toEqual([])

  activityLogId1 = _id

  checkActivitySubsection(activity)
})

test('check fetch all with content', async () => {
  const { data, ...obj1 } = await SendCommand(actions.fetchAllActivities)
  const [current, ...less] = data
  const { _id, createdAt, updatedAt, activity, user, ...obj2 } = current

  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(_id).toBe(activityLogId1)
  expect(user).toEqual(henriettaUser)
  expect(obj1).toEqual({})
  expect(obj2).toEqual({})
  expect(less).toEqual([])

  checkActivitySubsection(activity)
})

test('delete service', async () => {
  const { data, ...obj } = await SendCommand(actions.deleteService, { name: service1 })
  expect(Object.keys(obj)).toHaveLength(0)
  testService(data)
})

test('check that fetch nothing 3', async () => {
  const msg = await SendCommand(actions.fetchAllActivities)
  expect(msg).toEqual({ data: [] })
})

test('check that fetch all nothing 3', async () => {
  const msg = await SendCommand(actions.fetchActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})
