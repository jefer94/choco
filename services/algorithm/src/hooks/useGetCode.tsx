import { gql, useQuery, QueryResult } from '@apollo/client'

type Code = {
  readonly _id: string
  readonly title: string
  readonly code: string
}

const query = gql`
  query GetCode($id: ID!) {
    projects(id: $id) {
      _id
      name
      description
    }
  }
`

export function useGetCode(id: string): QueryResult<Code> {
  return useQuery(query, { variables: { id } })
}
