import { and, or, rule, not, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })((parent, args, { auth }) => {
  if (auth) return true
  throw new Error('Not Authenticated')
})

const canReadAnyActivity = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:any_activity'))

const canWriteAnyActivity = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:any_activity'))

const canAdminAnyActivity = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:any_activity'))

const canReadOwnActivity = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:own_activity'))

const canWriteOwnActivity = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:own_activity'))

const canAdminOwnActivity = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:own_activity'))

const canReadOwnAccount = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:own_account'))

const canWriteOwnAccount = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:own_account'))

const canAdminOwnAccount = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:own_account'))

const canReadAnyAccount = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:any_account'))

const canWriteAnyAccount = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:any_account'))

const canAdminAnyAccount = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:any_account'))

const canReadAnyCode = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:any_code'))

const canWriteAnyCode = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:any_code'))

const canAdminAnyCode = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:any_code'))

const canReadOwnCode = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:own_code'))

const canWriteOwnCode = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:own_code'))

const canAdminOwnCode = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:own_code'))

const canReadOwnProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:own_project'))

const canWriteOwnProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:own_project'))

const canAdminOwnProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:own_project'))

const canReadAnyProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:any_project'))

const canWriteAnyProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('write:any_project'))

const canAdminAnyProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('admin:any_project'))

const canShareOwnProject = rule({ cache: 'contextual' })((parent, args, { auth }) =>
  auth.scopes.includes('read:own_project'))

const isGuest = not(isAuthenticated)

export default shield({
  Query: {
    generateToken: isGuest,
    codes: or(canReadOwnCode, canAdminOwnCode),
    projects: or(canReadOwnProject, canAdminOwnProject),
    sharedCodes: isAuthenticated,
    sharedProjects: isAuthenticated,
    getCode: or(canReadOwnCode, canAdminOwnCode),
    getProject: or(canReadOwnProject, canAdminOwnProject),
    getProjectPermission: isAuthenticated
  },
  Mutation: {
    register: isGuest,
    addCode: or(canWriteOwnCode, canAdminOwnCode),
    addProject: or(canWriteOwnProject, canAdminOwnProject),
    addProjectPermission: or(canShareOwnProject, canAdminOwnProject),
    deleteCode: or(canWriteOwnCode, canAdminOwnCode),
    deleteProject: or(canWriteOwnProject, canAdminOwnProject),
    deleteProjectPermission: or(canShareOwnProject, canAdminOwnProject),
    updateCode: or(canWriteOwnCode, canAdminOwnCode),
    updateProject: or(canWriteOwnProject, canAdminOwnProject),
    updateProjectPermission: or(canShareOwnProject, canAdminOwnProject)
  }
}, {
  allowExternalErrors: true
})
