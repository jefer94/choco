import { gql, useQuery, QueryResult } from '@apollo/client'

type Project = {
  readonly _id: string
  readonly name: string
  readonly description: string
}

const query = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      _id
      name
      description
    }
  }
`

export function useGetProjects(id: string): QueryResult<Project> {
  return useQuery(query, { variables: { id } })
}
