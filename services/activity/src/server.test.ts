/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, NatsConnection, JSONCodec, StringCodec } from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { host, requestRefs, notFound } from './server'
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
  await server()
})

afterAll(() => {
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
  const msg = nc.request(host, encode({ type: action, ...obj }), { timeout: 5000 })
  const data: Request<T | Data> = decode((await msg).data)
  return data
}

const henrietta = '5f40c309bd73600bcc1cd207'
const dayan = '5f40c36401ba680924cb0afb'
const todd = '5f40c3705bea251f8289f4ed'
const service1 = 'algorithm'
const service2 = 'killer'

let serviceId1
let activityId1
let activityLogId1

test('Not found', async () => {
  const msg = nc.request(host, StringCodec().encode('Hello asdasdasd'))
  expect(decode((await msg).data)).toEqual({ error: notFound })
})

test('fetch nobody', async () => {
  const msg = await SendCommand(requestRefs.fetchAllActivities)
  expect(msg).toEqual({ data: [] })
})

test('fetch all nobody', async () => {
  const msg = await SendCommand(requestRefs.fetchActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})

test('add once service', async () => {
  const { data, ...obj } = await SendCommand(requestRefs.addOnceService, { name: service1 })
  expect(Object.keys(obj)).toHaveLength(0)

  const { _id, createdAt, updatedAt, ...rest } = data

  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(rest).toEqual({ name: 'algorithm' })
  serviceId1 = _id
})

test('add once service again', async () => {
  const { data, ...obj } = await SendCommand(requestRefs.addOnceService, { name: service1 })
  expect(Object.keys(obj)).toHaveLength(0)

  const { _id, createdAt, updatedAt, ...rest } = data

  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(rest).toEqual({ name: 'algorithm' })
})

test('check that fetch nothing 1', async () => {
  const msg = await SendCommand(requestRefs.fetchActivities)
  expect(msg).toEqual({ data: [] })
})

test('check that fetch all nothing 1', async () => {
  const msg = await SendCommand(requestRefs.fetchAllActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})

test('add once activity', async () => {
  const message = {
    name: 'Is henrietta',
    service: serviceId1
  }
  const { data, ...obj } = await SendCommand(requestRefs.addOnceActivity, message)

  expect(Object.keys(obj)).toHaveLength(0)
  const { _id, createdAt, updatedAt, service, ...rest } = data

  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(/^[^ ]+$/.test(service)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(rest).toEqual({ name: 'Is henrietta' })
  activityId1 = _id
})

test('add once activity again', async () => {
  const message = {
    name: 'Is henrietta',
    service: serviceId1
  }
  const { data, ...obj } = await SendCommand(requestRefs.addOnceActivity, message)

  expect(Object.keys(obj)).toHaveLength(0)
  const { _id, createdAt, updatedAt, service, ...rest } = data

  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(/^[^ ]+$/.test(service)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(rest).toEqual({ name: 'Is henrietta' })
})

test('check that fetch nothing 2', async () => {
  const msg = await SendCommand(requestRefs.fetchAllActivities)
  expect(msg).toEqual({ data: [] })
})

test('check that fetch all nothing 2', async () => {
  const msg = await SendCommand(requestRefs.fetchActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})

test('add one activity in log', async () => {
  const message = {
    user: henrietta,
    activity: activityId1
  }
  const { data, ...obj } = await SendCommand(requestRefs.addActivityLog, message)

  expect(Object.keys(obj)).toHaveLength(0)
  const { _id, createdAt, updatedAt, activity, user, ...rest } = data

  expect(Object.keys(rest)).toHaveLength(0)
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(/^[^ ]+$/.test(activity)).toBeTruthy()
  expect(/^[^ ]+$/.test(user)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
})

function checkActivitySubsection(obj: Record<string, any>): void {
  const { id, createdAt, updatedAt, service, ...obj2 } = obj

  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(id).toBe(activityId1)
  expect(service).toBe(serviceId1)
  expect(obj2).toEqual({ name: 'Is henrietta' })
}

test('check fetch with content', async () => {
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchAllActivities)
  const [current, ...less] = data
  const { id, createdAt, updatedAt, activity, user, ...obj2 } = current

  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(/^[a-zA-Z0-9]+$/.test(id)).toBeTruthy()
  expect(user).toBe(henrietta)
  expect(obj1).toEqual({})
  expect(obj2).toEqual({})
  expect(less).toEqual([])

  activityLogId1 = id

  checkActivitySubsection(activity)
})

test('check fetch all with content', async () => {
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchAllActivities)
  const [current, ...less] = data
  const { id, createdAt, updatedAt, activity, user, ...obj2 } = current

  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(id).toBe(activityLogId1)
  expect(user).toBe(henrietta)
  expect(obj1).toEqual({})
  expect(obj2).toEqual({})
  expect(less).toEqual([])

  checkActivitySubsection(activity)
})

test('delete service', async () => {
  const { data, ...obj } = await SendCommand(requestRefs.deleteService, { name: service1 })
  expect(Object.keys(obj)).toHaveLength(0)

  const { _id, createdAt, updatedAt, ...rest } = data

  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(rest).toEqual({ name: 'algorithm' })
})

test('check that fetch nothing 3', async () => {
  const msg = await SendCommand(requestRefs.fetchAllActivities)
  expect(msg).toEqual({ data: [] })
})

test('check that fetch all nothing 3', async () => {
  const msg = await SendCommand(requestRefs.fetchActivities, { user: henrietta })
  expect(msg).toEqual({ data: [] })
})
