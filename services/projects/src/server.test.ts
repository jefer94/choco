/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, NatsConnection, JSONCodec, StringCodec } from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { host, requestRefs, notFound } from './server'
import db, { clearCollections } from './db'

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
  clearCollections()
  // sock.close()
  // mongod.close()
})

const userId1 = 'Markssssssssssss LAS 129 games not matter, support of League of Legends'
const userId2 = 'Konan'
let projectId1: string
let codeId1: string
let permissionId1: string

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
test('Not found', async () => {
  const msg = nc.request(host, StringCodec().encode('Hello asdasdasd'))
  expect(decode((await msg).data)).toEqual({ error: notFound })
})

test('fetch user1 without projects', async () => {
  const message = {
    user: userId1
  }
  const msg = await SendCommand(requestRefs.fetchOwnProjects, message)
  expect(msg).toEqual({ data: [] })
})

test('fetch user1 without shared projects 1', async () => {
  const message = {
    user: userId1
  }
  const msg = await SendCommand(requestRefs.fetchShareProjects, message)
  expect(msg).toEqual({ data: [] })
})

test('Add project user1', async () => {
  const message = {
    user: userId1,
    name: 'Algorithm',
    description: 'Algorithm project'
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.addProject, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'Algorithm',
    description: 'Algorithm project',
    codes: [],
    collaborators: []
  })
  projectId1 = _id
})

test('fetch user1 with projects', async () => {
  const message = {
    user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchOwnProjects, message)
  expect(obj1).toEqual({})

  expect(data).toHaveLength(1)
  const { _id, createdAt, updatedAt, ...obj2 } = data[0]
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'Algorithm',
    description: 'Algorithm project',
    codes: [],
    collaborators: []
  })
})

test('get user1 project', async () => {
  const message = {
    id: projectId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.getProject, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'Algorithm',
    description: 'Algorithm project',
    codes: [],
    collaborators: []
  })
})

test('fetch user1 without shared projects 2', async () => {
  const message = {
    user: userId1
  }
  const msg = await SendCommand(requestRefs.fetchShareProjects, message)
  expect(msg).toEqual({ data: [] })
})

test('fetch user1 without codes', async () => {
  const message = {
    project: projectId1
  }
  const msg = await SendCommand(requestRefs.fetchOwnCodes, message)
  expect(msg).toEqual({ data: [] })
})

test('fetch user1 without share codes', async () => {
  const message = {
    project: projectId1
  }
  const msg = await SendCommand(requestRefs.fetchShareCodes, message)
  expect(msg).toEqual({ data: [] })
})

test('add user1 code', async () => {
  const message = {
    title: 'Main',
    code: 'import a from b',
    project: projectId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.addCode, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual(message)

  codeId1 = _id
})

test('add permission user2', async () => {
  const message = {
    user: userId2,
    project: projectId1,
    write: true,
    create: false,
    delete: true
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.addProjectPermission, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual(message)
  permissionId1 = _id
})

test('fetch user2 without projects', async () => {
  const message = {
    user: userId2
  }
  const msg = await SendCommand(requestRefs.fetchOwnProjects, message)
  expect(msg).toEqual({ data: [] })
})

test('fetch user2 with shared projects', async () => {
  const message = {
    user: userId2
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchShareProjects, message)
  expect(obj1).toEqual({})

  expect(data).toHaveLength(1)
  const { _id, createdAt, updatedAt, ...obj2 } = data[0]
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'Algorithm',
    description: 'Algorithm project',
    codes: [],
    collaborators: [],
    permission: {
      create: false,
      delete: true,
      user: userId2,
      write: true
    }
  })
})

test('Update user1 project', async () => {
  const message = {
    id: projectId1,
    name: 'New algorithm',
    description: 'New algorithm project'
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.updateProject, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'New algorithm',
    description: 'New algorithm project',
    codes: [],
    collaborators: []
  })
  projectId1 = _id
})

test('fetch user1 with projects updated', async () => {
  const message = {
    user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchOwnProjects, message)
  expect(obj1).toEqual({})

  expect(data).toHaveLength(1)
  const { _id, createdAt, updatedAt, ...obj2 } = data[0]
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'New algorithm',
    description: 'New algorithm project',
    codes: [],
    collaborators: []
  })
})

test('fetch user1 with codes', async () => {
  const message = {
    project: projectId1
    // user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchOwnCodes, message)
  expect(obj1).toEqual({})

  expect(data).toHaveLength(1)
  const { _id, createdAt, updatedAt, ...obj2 } = data[0]
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    title: 'Main',
    code: 'import a from b',
    project: projectId1
  })
})

test('update user1 with codes', async () => {
  const message = {
    id: codeId1,
    title: 'Main.al',
    code: 'import a from b.al'
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.updateCode, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    title: 'Main.al',
    code: 'import a from b.al',
    project: projectId1
  })
})

test('get user1 code', async () => {
  const message = {
    id: codeId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.getCode, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    title: 'Main.al',
    code: 'import a from b.al',
    project: projectId1
  })
})

test('update user1 permission', async () => {
  const message = {
    user: userId2,
    project: projectId1,
    write: false,
    create: true,
    delete: false
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.updateProjectPermission, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual(message)
})

test('get user1 permission', async () => {
  const message = {
    id: permissionId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.getProjectPermission, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId2,
    project: projectId1,
    write: false,
    create: true,
    delete: false
  })
})

test('fetch user1 with shared codes', async () => {
  const message = {
    project: projectId1
    // user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.fetchShareCodes, message)
  expect(obj1).toEqual({})

  expect(data).toHaveLength(1)
  const { _id, createdAt, updatedAt, ...obj2 } = data[0]
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    title: 'Main.al',
    code: 'import a from b.al',
    project: projectId1
  })
})

test('delete user1 with shared codes', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.deleteProjectPermission, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId2,
    project: projectId1,
    write: false,
    create: true,
    delete: false
  })
})

test('delete user1 shared codes that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  const msg = await SendCommand(requestRefs.deleteProjectPermission, message)
  expect(msg).toEqual({ data: null })
})

test('get user1 shared codes that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  const msg = await SendCommand(requestRefs.getProjectPermission, message)
  expect(msg).toEqual({ data: null })
})

test('delete user1 with codes', async () => {
  const message = {
    id: codeId1
    // user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.deleteCode, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    title: 'Main.al',
    code: 'import a from b.al',
    project: projectId1
  })
})

test('delete user1 codes that not exist', async () => {
  const message = {
    id: codeId1
    // user: userId1
  }
  const msg = await SendCommand(requestRefs.deleteProjectPermission, message)
  expect(msg).toEqual({ data: null })
})

test('get user1 codes that not exist', async () => {
  const message = {
    id: codeId1
  }
  const msg = await SendCommand(requestRefs.getProjectPermission, message)
  expect(msg).toEqual({ data: null })
})

test('get user1 shared codes that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  const msg = await SendCommand(requestRefs.getProjectPermission, message)
  expect(msg).toEqual({ data: null })
})

test('delete user1 with project', async () => {
  const message = {
    id: projectId1
    // user: userId1
  }
  const { data, ...obj1 } = await SendCommand(requestRefs.deleteProject, message)
  expect(obj1).toEqual({})

  const { _id, createdAt, updatedAt, ...obj2 } = data
  expect(/^[^ ]+$/.test(_id)).toBeTruthy()
  expect(Date.parse(createdAt)).toBeTruthy()
  expect(Date.parse(updatedAt)).toBeTruthy()
  expect(obj2).toEqual({
    user: userId1,
    name: 'New algorithm',
    description: 'New algorithm project',
    codes: [],
    collaborators: []
  })
})

test('get user1 project that not exist', async () => {
  const message = {
    id: codeId1
  }
  const msg = await SendCommand(requestRefs.getProjectPermission, message)
  expect(msg).toEqual({ data: null })
})

test('get user1 project that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  const msg = await SendCommand(requestRefs.getProjectPermission, message)
  expect(msg).toEqual({ data: null })
})
