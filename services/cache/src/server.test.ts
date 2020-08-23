import * as NATS from 'nats'
import { createClient as mockCreateClient, print as mockPrint } from 'redis-mock'
import server, { host, requestRefs, statusRefs } from './server'

jest.mock('redis', () => ({
  createClient: mockCreateClient,
  print: mockPrint
}))

const nc = NATS.connect({ json: true })
const whoami = `${host}-test`
const key1 = 'henrietta'

beforeAll(async () => {
  await server()
})

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
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.notFound })
})

test('get that not exist', async () => {
  nc.publish(host, { type: requestRefs.get, key: key1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.reject })
})

test('get object that not exist', async () => {
  nc.publish(host, { type: requestRefs.getObject, key: key1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.reject })
})

test('set', async () => {
  nc.publish(host, { type: requestRefs.set, key: key1, value: 'diane' }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success })
})

test('get string', async () => {
  nc.publish(host, { type: requestRefs.get, key: key1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: 'diane' })
})

test('get object but is not object', async () => {
  nc.publish(host, { type: requestRefs.getObject, key: key1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.reject })
})

test('set object', async () => {
  nc.publish(host, { type: requestRefs.setObject, key: key1, value: { x: 'diane' } }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success })
})

test('get but is object', async () => {
  nc.publish(host, { type: requestRefs.get, key: key1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: '{"x":"diane"}' })
})

test('get object', async () => {
  nc.publish(host, { type: requestRefs.getObject, key: key1 }, whoami)
  expect(await subscribe(whoami)).toEqual({ status: statusRefs.success, data: { x: 'diane' } })
})
