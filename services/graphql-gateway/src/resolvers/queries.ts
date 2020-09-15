import { serviceRefs, projectsRefs, fetchMsgWithAuth, fetchMsgWithAuthUser, authenticatorRefs, fetchMsg } from '../nats'

const authenticator = {
  generateToken: fetchMsg(serviceRefs.authenticator, authenticatorRefs.generateToken)
}

const projects = {
  codes: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.fetchOwnCodes),
  projects: fetchMsgWithAuthUser(serviceRefs.projects, projectsRefs.fetchOwnProjects),
  sharedCodes: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.fetchShareCodes),
  sharedProjects: fetchMsgWithAuthUser(serviceRefs.projects, projectsRefs.fetchShareProjects),
  getCode: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.getCode),
  getProject: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.getProject),
  getProjectPermission: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.getProjectPermission)
}

export default { ...authenticator, ...projects }
