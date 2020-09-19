import { serviceRefs, authenticatorRefs, projectsRefs, mutateWithAuth, mutate } from '../nats'

const authenticator = {
  register: mutate(serviceRefs.authenticator, authenticatorRefs.register)
}

const projects = {
  addCode: mutateWithAuth(serviceRefs.projects, projectsRefs.addCode),
  addProject: mutateWithAuth(serviceRefs.projects, projectsRefs.addProject),
  addProjectPermission: mutateWithAuth(serviceRefs.projects, projectsRefs.addProjectPermission),
  deleteCode: mutateWithAuth(serviceRefs.projects, projectsRefs.deleteCode),
  deleteProject: mutateWithAuth(serviceRefs.projects, projectsRefs.deleteProject),
  deleteProjectPermission: mutateWithAuth(serviceRefs.projects,
    projectsRefs.deleteProjectPermission),
  updateCode: mutateWithAuth(serviceRefs.projects, projectsRefs.updateCode),
  updateProject: mutateWithAuth(serviceRefs.projects, projectsRefs.updateProject),
  updateProjectPermission: mutateWithAuth(serviceRefs.projects,
    projectsRefs.updateProjectPermission)
}

export default { ...authenticator, ...projects }
