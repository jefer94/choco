/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { host, requestRefs, statusRefs } from './server'
import db from './db'

jest.setTimeout(600000)
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

const nc = NATS.connect({ json: true })
const whoami = `${host}-test`

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
    const id = nc.subscribe(whoami, (msg) => {
      resolve(msg)
      nc.unsubscribe(id)
      // resolve(arg1, arg2, arg3, arg4)
    })
  })
}

const henrietta = '5f40c309bd73600bcc1cd207'
const dayan = '5f40c36401ba680924cb0afb'
const todd = '5f40c3705bea251f8289f4ed'
const service1 = 'algorithm'
const service2 = 'killer'

let serviceId1
let serviceId2
let activityId1
let activityId2

test('Not found', async () => {
  nc.publish(host, 'Hello asdasdasd', whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.notFound })
})

test('fetch nobody', async () => {
  nc.publish(host, { type: requestRefs.fetchAllActivities }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('fetch all nobody', async () => {
  nc.publish(host, { type: requestRefs.fetchActivities, user: henrietta }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('add once service', async () => {
  nc.publish(host, { type: requestRefs.addOnceService, name: service1 }, whoami)
  const { data, ...obj } = await subscribe(whoami)
  expect(obj).toEqual({ status: statusRefs.success })
  expect(/^[a-zA-Z0-9]+$/.test(data)).toBeTruthy()
  serviceId1 = data
})

test('add once service again', async () => {
  nc.publish(host, { type: requestRefs.addOnceService, name: service1 }, whoami)
  const { data, ...obj } = await subscribe(whoami)
  expect(obj).toEqual({ status: statusRefs.success })
  expect(data).toBe(serviceId1)
})

test('check that fetch nothing 1', async () => {
  nc.publish(host, { type: requestRefs.fetchAllActivities }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('check that fetch all nothing 1', async () => {
  nc.publish(host, { type: requestRefs.fetchActivities, user: henrietta }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('add once activity', async () => {
  const message = {
    name: 'Is henrietta',
    service: serviceId1
  }
  nc.publish(host, { type: requestRefs.addOnceActivity, ...message }, whoami)
  const { data, ...obj } = await subscribe(whoami)
  expect(obj).toEqual({ status: statusRefs.success })
  expect(/^[a-zA-Z0-9]+$/.test(data)).toBeTruthy()
  activityId1 = data
})

test('add once activity again', async () => {
  const message = {
    name: 'Is henrietta',
    service: serviceId1
  }
  nc.publish(host, { type: requestRefs.addOnceActivity, ...message }, whoami)
  const { data, ...obj } = await subscribe(whoami)
  expect(obj).toEqual({ status: statusRefs.success })
  expect(data).toBe(activityId1)
})

test('check that fetch nothing 2', async () => {
  nc.publish(host, { type: requestRefs.fetchAllActivities }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('check that fetch all nothing 2', async () => {
  nc.publish(host, { type: requestRefs.fetchActivities, user: henrietta }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('add one activity in log', async () => {
  const message = {
    user: henrietta,
    activity: activityId1
  }
  nc.publish(host, { type: requestRefs.addActivityLog, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success })
})

test('check fetch with content', async () => {
  nc.publish(host, { type: requestRefs.fetchAllActivities }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('check fetch all with content', async () => {
  nc.publish(host, { type: requestRefs.fetchActivities, user: henrietta }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('delete service', async () => {
  nc.publish(host, { type: requestRefs.deleteService, name: service1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success })
})

test('check that fetch nothing 3', async () => {
  nc.publish(host, { type: requestRefs.fetchAllActivities }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})

test('check that fetch all nothing 3', async () => {
  nc.publish(host, { type: requestRefs.fetchActivities, user: henrietta }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: [] })
})
