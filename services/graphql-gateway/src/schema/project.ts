import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    "Fetch own codes"
    codes(project: String!): [Code!]!

    "Fetch own projects"
    projects: [Project!]!

    "Fetch share codes"
    sharedCodes(project: String!): [Code!]!

    "Fetch share projects"
    sharedProjects: [Project!]!

    "Get code"
    getCode(id: ID!): Code!

    "Get project"
    getProject(id: ID!): Project!

    "Get project permission"
    getProjectPermission(id: ID!): ProjectPermission!
  }

  extend type Mutation {
    "Add new code"
    addCode(input: AddCodeInput): Code!

    "Update code"
    updateCode(input: UpdateCodeInput): Code!

    "Delete code"
    deleteCode(id: ID!): Code!

    "Add new project"
    addProject(input: AddProjectInput): Project!

    "Update project"
    updateProject(input: UpdateProjectInput): Project!

    "Delete project"
    deleteProject(id: ID!): Project!

    "Add new project permission"
    addProjectPermission(input: AddProjectInput): ProjectPermission!

    "Update project permission"
    updateProjectPermission(input: UpdateProjectInput): ProjectPermission!

    "Delete project permission"
    deleteProjectPermission(id: ID!): ProjectPermission!
  }

  type Code {
    _id: ID!
    project: String!
    title: String!
    code: String!
    createdAt: String!
    updatedAt: String!
  }

  type Project {
    _id: ID!
    user: String!
    name: String!
    description: String!
    codes: [String!]!
    collaborators: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectPermission {
    _id: ID!
    write: Boolean!
    create: Boolean!
    delete: Boolean!
    project: String!
    user: String!
    createdAt: String!
    updatedAt: String!
  }

  input AddCodeInput {
    title: String!
    code: String!
    project: String!
  }

  input UpdateCodeInput {
    id: ID!
    title: String
    code: String
  }

  input AddProjectInput {
    name: String!
    description: String!
    user: String!
  }

  input UpdateProjectInput {
    id: ID!
    name: String
    description: String
  }

  input ProjectPermissionInput {
    user: String!
    project: String!
    write: Boolean
    create: Boolean
    delete: Boolean
  }
`
