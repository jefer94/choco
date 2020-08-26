import { publish, subscribe, serviceRefs, activityRefs, authenticatorRefs, projectsRefs } from '../nats'
import authorization from './authorization'

const activity = {
  // async addActivityLog(_, message, ctx) {
  //   const isAuth = await authorization(ctx.headers.authorization)
  //   if (!isAuth) return null
  //   const channel = publish(serviceRefs.activity, activityRefs.addActivityLog, message)
  //   return subscribe(channel)
  // },
  // async addOnceActivity(_, message, ctx) {
  //   const isAuth = await authorization(ctx.headers.authorization)
  //   if (!isAuth) return null
  //   const channel = publish(serviceRefs.activity, activityRefs.addOnceActivity, message)
  //   return subscribe(channel)
  // },
  // async addOnceService(_, message, ctx) {
  //   const isAuth = await authorization(ctx.headers.authorization)
  //   if (!isAuth) return null
  //   const channel = publish(serviceRefs.activity, activityRefs.addOnceService, message)
  //   return subscribe(channel)
  // },
  // async deleteService(_, message, ctx) {
  //   const isAuth = await authorization(ctx.headers.authorization)
  //   if (!isAuth) return null
  //   const channel = publish(serviceRefs.activity, activityRefs.deleteService, message)
  //   return subscribe(channel)
  // }
}

const authenticator = {
  async addScope(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.authenticator, authenticatorRefs.addScope, message)
    return subscribe(channel)
  },
  async deleteScope(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.authenticator, authenticatorRefs.deleteScope, message)
    return subscribe(channel)
  },
  async generateToken(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.authenticator, authenticatorRefs.generateToken, message)
    return subscribe(channel)
  },
  async register(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.authenticator, authenticatorRefs.register, message)
    return subscribe(channel)
  }
}

const projects = {
  async addCode(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.addCode, message)
    return subscribe(channel)
  },
  async addProject(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.addProject, message)
    return subscribe(channel)
  },
  async addProjectPermission(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.addProjectPermission, message)
    return subscribe(channel)
  },
  async deleteCode(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.deleteCode, message)
    return subscribe(channel)
  },
  async deleteProject(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.deleteProject, message)
    return subscribe(channel)
  },
  async deleteProjectPermission(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.deleteProjectPermission, message)
    return subscribe(channel)
  },
  async updateCode(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.updateCode, message)
    return subscribe(channel)
  },
  async updateProject(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.updateProject, message)
    return subscribe(channel)
  },
  async updateProjectPermission(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.updateProjectPermission, message)
    return subscribe(channel)
  }
}
// projectsRefs.

export default { ...activity, ...authenticator, ...projects }
