/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { buildFederatedSchema } from '@apollo/federation'
import jwt from 'jsonwebtoken'
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core'
import 'apollo-cache-control'

import { accounts } from './data'
import { AuthUser } from './models'
import permissions from './permissions'

const port = 4001

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    name: String
  }

  type Auth { 
    user: ID!
    token: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  extend type Query {
    account(id: ID!): Account
    accounts: [Account]
    viewer: Account! @cacheControl(maxAge: 10)
  }

  extend type Mutation {
    login(username: String!, password: String!): Auth
    register(input: UserInput!): Auth
  }
`

const resolvers = {
  Account: {
    _resolveReference(object) {
      return accounts.find((account) => account.id === object.id)
    }
  },
  Query: {
    account(parent, { id }) {
      return accounts.find((account) => account.id === id)
    },
    accounts() {
      return accounts
    },
    viewer(parent, args, { user }) {
      return accounts.find((account) => account.id === user.sub)
    }
  },
  Mutation: {
    async login(parent, arg) {
      const { username, password } = arg

      const user = await AuthUser.findOne({ $or: [arg, { email: username, password }] })
      if (user) {
        return {
          // eslint-disable-next-line no-underscore-dangle
          user: user._id,
          token: jwt.sign({ user: user._id }, 'f1BtnWgD3VKY', {
            // expiresIn: 3600 * 24 * 7,
            expiresIn: '7d',
            subject: user._id,
            algorithm: 'HS512'
          })
        }
      }
      throw new Error('invalid credentials')
    },
    async register(parent, arg) {
      const user = new AuthUser(arg.input)
      await user.save()

      return {
        // eslint-disable-next-line no-underscore-dangle
        user: user._id,
        token: jwt.sign({ user: user._id }, 'f1BtnWgD3VKY', {
          // expiresIn: 3600 * 24 * 7,
          expiresIn: '7d',
          subject: user._id,
          algorithm: 'HS512'
        })
      }
    }
  }
}

const apollo = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    const userAsString = req.headers.user as string
    const user = req.headers.user ? JSON.parse(userAsString) : null
    return { user }
  } // ,
  // plugins: [ApolloServerPluginInlineTraceDisabled()]
})

export default function server(): void {
  apollo.listen({ port }).then(({ url }) => {
    console.log(`Accounts service ready at ${url}`)
  })
}
