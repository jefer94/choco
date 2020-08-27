import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlHTTP } from 'express-graphql'
import { readFileSync } from 'fs'
import * as path from 'path'
import resolvers from './resolvers'

const app = express()
// /* GraphQL */
const typeDefs = readFileSync(path.resolve(__dirname, '..', 'src', 'schema.gql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

export function server(): void {
  app.listen(process.env.PORT || 5000)
}

// graphql(schema, '{ hello }', resolvers)
