import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlHTTP } from 'express-graphql'
import { readFileSync } from 'fs'
import * as path from 'path'
import resolvers from './resolvers'
import authorization from './middlewares/authorization'

export const app = express()

// GraphQL.
const typeDefs = readFileSync(path.resolve(__dirname, '..', 'src', 'schema.gql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/', authorization, graphqlHTTP({
  schema,
  rootValue: resolvers,
  // customFormatErrorFn: (err) => {
  //   // const error = getErrorCode(err.message)
  //   return ({ message: 'error.message', statusCode: 'error.statusCode' })
  // },
  graphiql: true
}))

export function server(): void {
  app.listen(process.env.PORT || 5000)
}
