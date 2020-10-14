import { gql } from 'apollo-server-express'

import auth from './auth'
import project from './project'

const link = gql`
  type Query {
    _: Boolean
  }
 
  type Mutation {
    _: Boolean
  }
 
  type Subscription {
    _: Boolean
  }
`

export default [link, auth, project]
