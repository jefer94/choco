import { gql, useQuery, QueryResult } from '@apollo/client'

type ProjectPermission = {
  readonly _id: string
  readonly write: boolean
  readonly create: boolean
  readonly delete: boolean
  readonly project: boolean
  readonly user: string
}

const query = gql`
  query GetProjectPermission($id: ID!) {
    getProjectPermission(id: $id) {
      _id
      write
      create
      delete
      project
      user
    }
  }
`

export function useGetProjectPermission(id: string): QueryResult<ProjectPermission> {
  return useQuery(query, { variables: { id } })
}
