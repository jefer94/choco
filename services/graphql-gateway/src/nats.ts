import { connect, JSONCodec } from 'nats'
import keychain from '@chocolab/keychain'
import { Request } from './middlewares/authorization'

const connection = connect(process.env.BROKER ?
  { servers: process.env.BROKER } : {})

// const nc = connect(process.env.BROKER ?
//   { url: process.env.BROKER } : {})
// { payload: Payload.JSON, url: process.env.BROKER } : { payload: 'json' })

export enum activityRefs {
  addActivityLog = 'add activity log',
  addOnceActivity = 'add once activity',
  addOnceService = 'add once service',
  deleteService = 'delete service',
  fetchActivities = 'fetch activities',
  fetchAllActivities = 'fetch all activities'
}

export enum authenticatorRefs {
  checkToken = 'check token',
  generateToken = 'generate token',
  register = 'register',
  addScope = 'add scope',
  deleteScope = 'delete scope'
}

export enum cacheRefs {
  get = 'get',
  set = 'set',
  getObject = 'get object',
  setObject = 'set object'
}

export enum projectsRefs {
  addCode = 'add code',
  addProject = 'add project',
  addProjectPermission = 'add project permission',
  deleteCode = 'delete code',
  deleteProject = 'delete project',
  deleteProjectPermission = 'delete project permission',
  fetchAllProjects = 'fetch all projects',
  fetchOwnCodes = 'fetch own codes',
  fetchOwnProjects = 'fetch own projects',
  fetchShareCodes = 'fetch share codes',
  fetchShareProjects = 'fetch share projects',
  getCode = 'get code',
  getProject = 'get project',
  getProjectPermission = 'get project permission',
  updateCode = 'update code',
  updateProject = 'update project',
  updateProjectPermission = 'update project permission'
}

export enum statusRefs {
  success = 'Success',
  reject = 'Reject',
  notFound = 'Not found'
}

export enum serviceRefs {
  activity = 'activity',
  authenticator = 'authenticator',
  cache = 'cache',
  projects = 'projects',
}

type SubscribeRequest<T> = {
  readonly data?: T
  readonly error?: string
}

// export async function subscribe<T>(service: string): Promise<T> {
//   const nc = await connection
//   console.log('llll0', service)
//   const msg = await nc.request(service)
//   // const msg = await nc.subscribe(service, { max: 1 })
//   // msg.
//   console.log('llll1')
//   const data: SubscribeRequest<T> = JSONCodec().decode(msg.data)
//   console.log('llll2')

//   if (data.error) throw data.error
//   return data.data
//   console.log('llll3')

// }

// export async function publish<T>(service: string, action: string, message: Record<string, T>):
//   Promise<string> {
//   const nc = await connection
//   console.log('llll0', service)
//   const msg = nc.request(service)
//   const channel = keychain(service)
//   nc.publish(service, JSONCodec().encode({ type: action, ...message }), { reply: channel })
//   // nc.publishRequest()
//   return channel
// }

export async function SendCommand<T>(service: string, action: string, message: Msg):
  Promise<T> {
  const nc = await connection
  const channel = keychain(service)
  const msg = nc.request(service)
  nc.publish(service, JSONCodec().encode({ type: action, ...message }), { reply: channel })
  // nc.publishRequest()

  console.log('llll1')
  const data: SubscribeRequest<T> = JSONCodec().decode((await msg).data)
  console.log('llll2', data)

  if (data.error) throw data.error
  return data.data
  console.log('llll3')
}

type Msg = Record<string, unknown>
type FetchMsg = (_: unknown, message: Msg, ctx: Request) => Promise<Msg>

export function fetchMsgWithAuth(service: string, project: string): FetchMsg {
  return async (_, message: Msg, ctx) => {
    if (ctx.auth?.user) {
      return SendCommand(service, project, message)
    }
    throw ctx.error
  }
}

export function fetchMsgWithAuthUser(service: string, project: string): FetchMsg {
  return async (_, message, ctx) => {
    if (ctx.auth?.user) {
      return SendCommand(service, project, message)
    }
    throw ctx.error
  }
}

export function fetchMsg(service: string, project: string): FetchMsg {
  return async (_, message, ctx) => SendCommand(service, project, message)
}
