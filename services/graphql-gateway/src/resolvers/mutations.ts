import { serviceRefs, authenticatorRefs, projectsRefs, fetchMsg, fetchMsgWithAuth } from '../nats'

const authenticator = {
  register: fetchMsg(serviceRefs.authenticator, authenticatorRefs.register)
}

const projects = {
  addCode: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.addCode),
  addProject: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.addProject),
  addProjectPermission: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.addProjectPermission),
  deleteCode: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.deleteCode),
  deleteProject: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.deleteProject),
  deleteProjectPermission: fetchMsgWithAuth(serviceRefs.projects,
    projectsRefs.deleteProjectPermission),
  updateCode: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.updateCode),
  updateProject: fetchMsgWithAuth(serviceRefs.projects, projectsRefs.updateProject),
  updateProjectPermission: fetchMsgWithAuth(serviceRefs.projects,
    projectsRefs.updateProjectPermission)
}

export default { ...authenticator, ...projects }
