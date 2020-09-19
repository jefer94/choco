import { connect, JSONCodec } from 'nats'
import { Request } from './middlewares/authorization'

const connection = connect(process.env.BROKER ?
  { servers: process.env.BROKER, timeout: 10000 } : { timeout: 10000 })

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

export async function SendCommand<T>(service: string, action: string, message: Msg):
  Promise<T> {
  const nc = await connection
  const msg = nc.request(service, JSONCodec().encode({ type: action, ...message }),
    { timeout: 5000 })

  const data: SubscribeRequest<T> = JSONCodec().decode((await msg).data)

  if (data.error) throw new Error(data.error)
  return data.data
}

type Msg = Record<string, unknown>
type FetchMsg = (_: unknown, message: Msg, ctx: Request) => Promise<Msg>

type Input = {
  readonly id?: string
  readonly input?: Record<string, unknown>
}
type Mutate = (_: unknown, message: Input, ctx: Request) => Promise<Msg>

export function fetchMsg(service: string, project: string): FetchMsg {
  return async (_, message) => SendCommand(service, project, message)
}

export function fetchMsgWithAuth(service: string, project: string): FetchMsg {
  return async (_, message, ctx) => {
    if (ctx.auth?.user) {
      return SendCommand(service, project, message)
    }
    throw new Error(ctx.error)
  }
}

export function fetchMsgWithAuthUser(service: string, project: string): FetchMsg {
  return async (_, message, ctx) => {
    if (ctx.auth?.user) {
      return SendCommand(service, project, message)
    }
    throw new Error(ctx.error)
  }
}

export function mutate(service: string, project: string): Mutate {
  return async (_, message) => SendCommand(service, project, { ...message.input, id: message.id })
}

export function mutateWithAuth(service: string, project: string): Mutate {
  return async (_, message, ctx) => {
    if (ctx.auth?.user) {
      return SendCommand(service, project, { ...message.input, id: message.id })
    }
    throw new Error(ctx.error)
  }
}

export function mutateWithAuthUser(service: string, project: string): Mutate {
  return async (_, message, ctx) => {
    if (ctx.auth?.user) {
      return SendCommand(service, project, { ...message.input, id: message.id })
    }
    throw new Error(ctx.error)
  }
}
