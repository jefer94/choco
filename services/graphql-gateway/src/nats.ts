import * as NATS from 'nats'
import keychain from '@chocolab/keychain'
import { Request } from './middlewares/authorization'

const nc = NATS.connect(process.env.BROKER ?
  { json: true, url: process.env.BROKER } : { json: true })

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

export function subscribe<T>(service: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = nc.subscribe(service, (msg) => {
      if (msg.error) reject(msg.error)
      resolve(msg.data)
      nc.unsubscribe(id)
    })
  })
}

export function publish<T>(service: string, action: string, message: Record<string, T>): string {
  const channel = keychain(service)
  nc.publish(service, { type: action, ...message }, channel)
  return channel
}

type Msg = Record<string, unknown>
type FetchMsg = (_: unknown, message: Msg, ctx: Request) => Promise<Msg>

export function fetchMsgWithAuth(service: string, project: string): FetchMsg {
  return (_, message, ctx) => {
    if (ctx.auth?.user) {
      const channel = publish(service, project, message)
      return subscribe(channel)
    }
    throw ctx.error
  }
}

export function fetchMsgWithAuthUser(service: string, project: string): FetchMsg {
  return (_, message, ctx) => {
    if (ctx.auth?.user) {
      const channel = publish(service, project, { ...message, user: ctx.auth.user })
      return subscribe(channel)
    }
    throw ctx.error
  }
}

export function fetchMsg(service: string, project: string): FetchMsg {
  return (_, message, ctx) => {
    const channel = publish(service, project, message)
    return subscribe(channel)
  }
}
