import { and, or, rule, not, shield } from 'graphql-shield'

function getPermissions(user): readonly any[] {
  if (user && user['https://awesomeapi.com/graphql']) {
    return user['https://awesomeapi.com/graphql'].permissions
  }
  return []
}

const isAuthenticated = rule({ cache: 'contextual' })((parent, args, { user }) => user !== null)

const canReadAnyAccount = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user)
  return userPermissions.includes('read:any_account')
})

const canReadOwnAccount = rule({ cache: 'contextual' })((parent, args, { user }) => {
  const userPermissions = getPermissions(user)
  return userPermissions.includes('read:own_account')
})

const isReadingOwnAccount = rule({ cache: 'contextual' })((parent, { id }, { user }) => user && user.sub === id)

// const guessRule = rule({ cache: 'no_cache' })(() => true)

export default shield({
  Query: {
    account: or(and(canReadOwnAccount, isReadingOwnAccount), canReadAnyAccount),
    accounts: canReadAnyAccount,
    viewer: isAuthenticated
  },
  Mutation: {
    login: not(isAuthenticated),
    register: not(isAuthenticated)
  }
}, {
  allowExternalErrors: true
})
