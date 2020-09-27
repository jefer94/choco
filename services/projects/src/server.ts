/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import { connect, JSONCodec } from 'nats'
import addCode from './actions/addCode'
import addProject from './actions/addProject'
import addProjectPermission from './actions/addProjectPermission'
import deleteCode from './actions/deleteCode'
import deleteProject from './actions/deleteProject'
import deleteProjectPermission from './actions/deleteProjectPermission'
import fetchOwnCodes from './actions/fetchOwnCodes'
import fetchOwnProjects from './actions/fetchOwnProjects'
import fetchShareCodes from './actions/fetchShareCodes'
import fetchShareProjects from './actions/fetchShareProjects'
import getCode from './actions/getCode'
import getProject from './actions/getProject'
import getProjectPermission from './actions/getProjectPermission'
import updateCode from './actions/updateCode'
import updateProject from './actions/updateProject'
import updateProjectPermission from './actions/updateProjectPermission'

// let sid = 0
export function close(): void {
  // nc.unsubscribe(sid)
}

export const host = 'projects'

export enum actions {
  addCode = 'add code',
  addProject = 'add project',
  addProjectPermission = 'add project permission',
  deleteCode = 'delete code',
  deleteProject = 'delete project',
  deleteProjectPermission = 'delete project permission',
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

export const notFound = 'command not found'

export default async function server(): Promise<void> {
  const nc = await connect(process.env.BROKER ?
    { servers: process.env.BROKER } : {})

  nc.subscribe(host, { callback: async (error, msg) => {
    const { decode, encode } = JSONCodec()
    const { reply, data } = msg

    if (reply) {
      try {
        const { type, ...request } = decode(data)

        if (type === actions.addCode) {
          nc.publish(reply, encode(await addCode(request)))
        }
        else if (type === actions.addProject) {
          nc.publish(reply, encode(await addProject(request)))
        }
        else if (type === actions.addProjectPermission) {
          nc.publish(reply, encode(await addProjectPermission(request)))
        }
        else if (type === actions.deleteCode) {
          nc.publish(reply, encode(await deleteCode(request.id)))
        }
        else if (type === actions.deleteProject) {
          nc.publish(reply, encode(await deleteProject(request.id)))
        }
        else if (type === actions.deleteProjectPermission) {
          nc.publish(reply, encode(await deleteProjectPermission(request.id)))
        }
        else if (type === actions.fetchOwnCodes) {
          nc.publish(reply, encode(await fetchOwnCodes(request.project)))
        }
        else if (type === actions.fetchOwnProjects) {
          nc.publish(reply, encode(await fetchOwnProjects(request.user)))
        }
        else if (type === actions.fetchShareCodes) {
          nc.publish(reply, encode(await fetchShareCodes(request.project)))
        }
        else if (type === actions.fetchShareProjects) {
          nc.publish(reply, encode(await fetchShareProjects(request.user)))
        }
        else if (type === actions.getCode) {
          nc.publish(reply, encode(await getCode(request.id)))
        }
        else if (type === actions.getProject) {
          nc.publish(reply, encode(await getProject(request.id)))
        }
        else if (type === actions.getProjectPermission) {
          nc.publish(reply, encode(await getProjectPermission(request.id)))
        }
        else if (type === actions.updateCode) {
          nc.publish(reply, encode(await updateCode(request)))
        }
        else if (type === actions.updateProject) {
          nc.publish(reply, encode(await updateProject(request)))
        }
        else if (type === actions.updateProjectPermission) {
          nc.publish(reply, encode(await updateProjectPermission(request)))
        }
      }
      catch { nc.publish(reply, encode({ error: notFound })) }
    }
  } })
}
