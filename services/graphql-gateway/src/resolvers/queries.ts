import { publish, subscribe, serviceRefs, activityRefs, authenticatorRefs, projectsRefs } from '../nats'
import authorization from './authorization'

const example = {
  hello(root) {
    console.log(root)
    return 'Hola mundo'
  }
}

const activity = {
  // async userActivities(_, message, ctx) {
  //   const isAuth = await authorization(ctx.headers.authorization)
  //   if (!isAuth) return null
  //   const channel = publish(serviceRefs.activity, activityRefs.fetchActivities, message)
  //   return subscribe(channel)
  // },
  // async allActivities(_, message, ctx) {
  //   const isAuth = await authorization(ctx.headers.authorization)
  //   if (!isAuth) return null
  //   const channel = publish(serviceRefs.activity, activityRefs.fetchAllActivities, message)
  //   return subscribe(channel)
  // }
}

const authenticator = {
  async checkToken(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.authenticator, authenticatorRefs.checkToken, message)
    return subscribe(channel)
  }
}

const projects = {
  async allProjects(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.fetchAllProjects, message)
    return subscribe(channel)
  },
  async ownCodes(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.fetchOwnCodes, message)
    return subscribe(channel)
  },
  async ownProjects(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.fetchOwnProjects, message)
    return subscribe(channel)
  },
  async shareCodes(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.fetchShareCodes, message)
    return subscribe(channel)
  },
  async shareProjects(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.fetchShareProjects, message)
    return subscribe(channel)
  },
  async getCode(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.getCode, message)
    return subscribe(channel)
  },
  async getProject(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.getProject, message)
    return subscribe(channel)
  },
  async getProjectPermission(_, message, ctx) {
    const isAuth = await authorization(ctx.headers.authorization)
    if (!isAuth) return null
    const channel = publish(serviceRefs.projects, projectsRefs.getProjectPermission, message)
    return subscribe(channel)
  }
}

export default { ...example, ...activity, ...authenticator, ...projects }
