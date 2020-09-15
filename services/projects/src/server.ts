/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
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

const nc = NATS.connect(process.env.BROKER ?
  { json: true, url: process.env.BROKER } : { json: true })

let sid = 0
export function close(): void {
  nc.unsubscribe(sid)
}

export const host = 'projects'

export enum requestRefs {
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
  sid = nc.subscribe(host, async (msg, reply) => {
    if (reply) {
      const { type, ...data } = msg

      if (type === requestRefs.addCode) nc.publish(reply, await addCode(data))
      else if (type === requestRefs.addProject) nc.publish(reply, await addProject(data))
      else if (type === requestRefs.addProjectPermission) {
        nc.publish(reply, await addProjectPermission(data))
      }
      else if (type === requestRefs.deleteCode) nc.publish(reply, await deleteCode(data.id))
      else if (type === requestRefs.deleteProject) nc.publish(reply, await deleteProject(data.id))
      else if (type === requestRefs.deleteProjectPermission) {
        nc.publish(reply, await deleteProjectPermission(data.id))
      }
      else if (type === requestRefs.fetchOwnCodes) {
        nc.publish(reply, await fetchOwnCodes(data.project))
      }
      else if (type === requestRefs.fetchOwnProjects) {
        nc.publish(reply, await fetchOwnProjects(data.user))
      }
      else if (type === requestRefs.fetchShareCodes) {
        nc.publish(reply, await fetchShareCodes(data.project))
      }
      else if (type === requestRefs.fetchShareProjects) {
        nc.publish(reply, await fetchShareProjects(data.user))
      }
      else if (type === requestRefs.getCode) nc.publish(reply, await getCode(data.id))
      else if (type === requestRefs.getProject) nc.publish(reply, await getProject(data.id))
      else if (type === requestRefs.getProjectPermission) {
        nc.publish(reply, await getProjectPermission(data.id))
      }
      else if (type === requestRefs.updateCode) nc.publish(reply, await updateCode(data))
      else if (type === requestRefs.updateProject) nc.publish(reply, await updateProject(data))
      else if (type === requestRefs.updateProjectPermission) {
        nc.publish(reply, await updateProjectPermission(data))
      }
      else nc.publish(reply, { error: notFound })
    }
  })
}
