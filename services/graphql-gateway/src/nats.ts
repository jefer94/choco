import * as NATS from 'nats'
import keychain from '@chocolab/keychain'

const nc = NATS.connect({ json: true })

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
  return new Promise((resolve) => {
    const id = nc.subscribe(service, (msg) => {
      resolve(msg)
      nc.unsubscribe(id)
    })
  })
}

export function publish<T>(service: string, action: string, message: Record<string, T>): string {
  const channel = keychain(service)
  nc.publish(service, { type: action, ...message }, channel)
  return channel
}
