/* eslint-disable functional/no-loop-statement */
/* eslint-disable no-restricted-syntax */
import * as NATS from 'nats'
import addCode from './actions/addCode'
import addProject from './actions/addProject'
import addProjectPermission from './actions/addProjectPermission'
import deleteCode from './actions/deleteCode'
import deleteProject from './actions/deleteProject'
import deleteProjectPermission from './actions/deleteProjectPermission'
import fetchAllProjects from './actions/fetchAllProjects'
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

export default async function server(): Promise<void> {
  sid = nc.subscribe(host, async (msg, reply) => {
    if (reply) {
      const { type, ...data } = msg

      if (type === requestRefs.addCode) {
        const bool = await addCode(data)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.addProject) {
        const bool = await addProject(data)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.addProjectPermission) {
        const bool = await addProjectPermission(data)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.deleteCode) {
        const bool = await deleteCode(data.id)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.deleteProject) {
        const bool = await deleteProject(data.id)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.deleteProjectPermission) {
        const bool = await deleteProjectPermission(data.id)
        const res = {
          status: bool ? statusRefs.success : statusRefs.reject
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchAllProjects) {
        const arr = await fetchAllProjects(data.user)
        const res = {
          status: arr ? statusRefs.success : statusRefs.reject,
          data: arr
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchOwnCodes) {
        const arr = await fetchOwnCodes(data.project)
        const res = {
          status: arr ? statusRefs.success : statusRefs.reject,
          data: arr
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchOwnProjects) {
        const arr = await fetchOwnProjects(data.user)
        const res = {
          status: arr ? statusRefs.success : statusRefs.reject,
          data: arr
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchShareCodes) {
        const arr = await fetchShareCodes(data.project)
        const res = {
          status: arr ? statusRefs.success : statusRefs.reject,
          data: arr
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.fetchShareProjects) {
        const arr = await fetchShareProjects(data.user)
        const res = {
          status: arr ? statusRefs.success : statusRefs.reject,
          data: arr
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.getCode) {
        const current = await getCode(data.id)
        const res = {
          status: current ? statusRefs.success : statusRefs.reject,
          data: current
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.getProject) {
        const current = await getProject(data.id)
        const res = {
          status: current ? statusRefs.success : statusRefs.reject,
          data: current
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.getProjectPermission) {
        const current = await getProjectPermission(data.id)
        const res = {
          status: current ? statusRefs.success : statusRefs.reject,
          data: current
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.updateCode) {
        await updateCode(data)
        const res = {
          status: statusRefs.success
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.updateProject) {
        await updateProject(data)
        const res = {
          status: statusRefs.success
        }
        nc.publish(reply, res)
      }
      else if (type === requestRefs.updateProjectPermission) {
        await updateProjectPermission(data)
        const res = {
          status: statusRefs.success
        }
        nc.publish(reply, res)
      }
      else nc.publish(reply, { status: statusRefs.notFound })
    }
  })
}
