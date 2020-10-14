import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    "Generate token"
    generateToken(username: String!, password: String!): Auth!
  }

  extend type Mutation {
    "Register"
    register(input: UserInput): Auth!
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
`
