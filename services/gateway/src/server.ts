import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server-express'
import express, { Request } from 'express'
import expressJwt from 'express-jwt'

type RequestWithAuth = Request & {
  // eslint-disable-next-line functional/prefer-readonly-type
  user?: string
  // eslint-disable-next-line functional/prefer-readonly-type
  error?: string
}

const port = 4000
const app = express()

app.use(
  expressJwt({
    secret: 'f1BtnWgD3VKY',
    algorithms: ['HS512'],
    credentialsRequired: false
  })
)

const gateway = new ApolloGateway({
  serviceList: [{ name: 'accounts', url: process.env.ACCOUNTS || 'http://localhost:4001' }],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          'user',
          context.user ? JSON.stringify(context.user) : null
        )
      }
    })
  }
})

const apollo = new ApolloServer({
  gateway,
  subscriptions: false,
  tracing: true,
  context: ({ req }) => {
    const currentReq = req as RequestWithAuth
    const user = currentReq.user || null
    return { user }
  }
})

apollo.applyMiddleware({ app, path: '/' })

export default function server(): void {
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${apollo.graphqlPath}`))
}
