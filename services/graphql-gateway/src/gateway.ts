import express, { Request } from 'express'
import http from 'http'
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import expressJwt from 'express-jwt'
import cors from 'cors'
import typeDefs from './schema'
import resolvers from './resolvers'
import permissions from './permissions'
// import authorization from './middlewares/authorization'

export const app = express()

type Auth = {
  readonly user: string
  readonly scopes: readonly string[]
  readonly exp: number
  readonly iat: number
}

type RequestWithAuth = Request & {
  readonly auth?: Auth
}

// GraphQL.
const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions)

const apollo = new ApolloServer({
  tracing: true,
  context: ({ req }) => {
    const currentReq = req as RequestWithAuth
    const auth = currentReq.auth || null
    return { auth }
  },
  typeDefs,
  resolvers,
  schema
})

app.use(cors())
app.use(expressJwt({
  secret: process.env.SECRET,
  algorithms: ['HS512'],
  credentialsRequired: false
}))
// app.use(authorization)
apollo.applyMiddleware({ app, path: '/' })

const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

export function server(): void {
  httpServer.listen(process.env.PORT || 5000)
}
