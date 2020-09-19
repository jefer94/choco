import { connect, NatsConnection, JSONCodec, StringCodec } from 'nats'
import { createClient as mockCreateClient, print as mockPrint } from 'redis-mock'
import server, { host, requestRefs, notFound } from './server'

jest.mock('redis', () => ({
  createClient: mockCreateClient,
  print: mockPrint
}))

let nc: NatsConnection
const { decode, encode } = JSONCodec()
const key1 = 'henrietta'

beforeAll(async () => {
  nc = await connect()
  await server()
})

type Data = Record<string, unknown>
type Request = {
  readonly data?: Data
  readonly error?: string
}

export async function SendCommand(action: string, message: Data):
  Promise<Record<string, unknown>> {
  const msg = nc.request(host, encode({ type: action, ...message }), { timeout: 5000 })
  const data: Request = decode((await msg).data)
  return data
}

test('Not found', async () => {
  const msg = nc.request(host, StringCodec().encode('Hello asdasdasd'))
  expect(decode((await msg).data)).toEqual({ error: notFound })
})

test('get that not exist', async () => {
  const msg = await SendCommand(requestRefs.get, { key: key1 })
  expect(msg).toEqual({ data: { key: key1, value: null } })
})

test('get object that not exist', async () => {
  const msg = await SendCommand(requestRefs.getObject, { key: key1 })
  expect(msg).toEqual({ data: { key: key1, value: null } })
})

test('set', async () => {
  const msg = await SendCommand(requestRefs.set, { key: key1, value: 'diane' })
  expect(msg).toEqual({ data: { key: key1, value: 'diane' } })
})

test('get string', async () => {
  const msg = await SendCommand(requestRefs.get, { key: key1 })
  expect(msg).toEqual({ data: { key: key1, value: 'diane' } })
})

test('get object but is not object', async () => {
  const msg = await SendCommand(requestRefs.getObject, { key: key1 })
  expect(msg).toEqual({ error: 'invalid object' })
})

test('set object', async () => {
  const msg = await SendCommand(requestRefs.setObject, { key: key1, value: { x: 'diane' } })
  expect(msg).toEqual({ data: { key: key1, value: '{"x":"diane"}' } })
})

test('get but is object', async () => {
  const msg = await SendCommand(requestRefs.get, { key: key1 })
  expect(msg).toEqual({ data: { key: key1, value: '{"x":"diane"}' } })
})

test('get object', async () => {
  const msg = await SendCommand(requestRefs.getObject, { key: key1 })
  expect(msg).toEqual({ data: { key: key1, value: { x: 'diane' } } })
})
