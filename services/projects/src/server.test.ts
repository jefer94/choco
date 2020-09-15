/* eslint-disable no-await-in-loop */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import server, { host, requestRefs, notFound } from './server'
import db, { clearCollections } from './db'

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
  clearCollections()
  // sock.close()
  // mongod.close()
})

const userId1 = 'Markssssssssssss LAS 129 games not matter, support of League of Legends'
const userId2 = 'Konan'
let projectId1: string
let codeId1: string
let permissionId1: string

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

test('fetch user1 without projects', async () => {
  const message = {
    user: userId1
  }
  nc.publish(host, { type: requestRefs.fetchOwnProjects, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: [] })
})

test('fetch user1 without shared projects 1', async () => {
  const message = {
    user: userId1
  }
  nc.publish(host, { type: requestRefs.fetchShareProjects, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: [] })
})

test('Add project user1', async () => {
  const message = {
    user: userId1,
    name: 'Algorithm',
    description: 'Algorithm project'
  }
  nc.publish(host, { type: requestRefs.addProject, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.fetchOwnProjects, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.getProject, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.fetchShareProjects, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: [] })
})

test('fetch user1 without codes', async () => {
  const message = {
    project: projectId1
  }
  nc.publish(host, { type: requestRefs.fetchOwnCodes, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: [] })
})

test('fetch user1 without share codes', async () => {
  const message = {
    project: projectId1
  }
  nc.publish(host, { type: requestRefs.fetchShareCodes, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: [] })
})

test('add user1 code', async () => {
  const message = {
    title: 'Main',
    code: 'import a from b',
    project: projectId1
  }
  nc.publish(host, { type: requestRefs.addCode, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.addProjectPermission, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.fetchOwnProjects, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: [] })
})

test('fetch user2 with shared projects', async () => {
  const message = {
    user: userId2
  }
  nc.publish(host, { type: requestRefs.fetchShareProjects, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.updateProject, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.fetchOwnProjects, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.fetchOwnCodes, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.updateCode, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.getCode, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.updateProjectPermission, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.getProjectPermission, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.fetchShareCodes, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.deleteProjectPermission, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.deleteProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})

test('get user1 shared codes that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  nc.publish(host, { type: requestRefs.getProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})

test('delete user1 with codes', async () => {
  const message = {
    id: codeId1
    // user: userId1
  }
  nc.publish(host, { type: requestRefs.deleteCode, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.deleteProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})

test('get user1 codes that not exist', async () => {
  const message = {
    id: codeId1
  }
  nc.publish(host, { type: requestRefs.getProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})

test('get user1 shared codes that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  nc.publish(host, { type: requestRefs.getProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})

test('delete user1 with project', async () => {
  const message = {
    id: projectId1
    // user: userId1
  }
  nc.publish(host, { type: requestRefs.deleteProject, ...message }, whoami)

  const { data, ...obj1 } = await subscribe(whoami)
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
  nc.publish(host, { type: requestRefs.getProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})

test('get user1 project that not exist', async () => {
  const message = {
    id: permissionId1
    // user: userId1
  }
  nc.publish(host, { type: requestRefs.getProjectPermission, ...message }, whoami)
  expect(await subscribe(whoami)).toEqual({ data: null })
})