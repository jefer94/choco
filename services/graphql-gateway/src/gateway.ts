import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlHTTP } from 'express-graphql'
import { readFileSync } from 'fs'
import cors from 'cors'
import * as path from 'path'
import resolvers from './resolvers'
import authorization from './middlewares/authorization'

export const app = express()

// GraphQL.
const typeDefs = readFileSync(path.resolve(__dirname, '..', 'src', 'schema.gql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())
app.use('/', authorization, graphqlHTTP({
  schema,
  rootValue: resolvers,
  // customFormatErrorFn: (e) => {
  //   console.log(e)
  //   // const error = getErrorCode(err.message)
  //   return e
  // },
  graphiql: true
}))

export function server(): void {
  app.listen(process.env.PORT || 5000)
}
