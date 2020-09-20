import { gql, useQuery, QueryResult } from '@apollo/client'

type Project = {
  readonly _id: string
  readonly name: string
  readonly description: string
}

const query = gql`
  query FetchSharedProjects {
    sharedProjects {
      _id
      name
      description
    }
  }
`

export function useFetchSharedProjects(): QueryResult<readonly Project[]> {
  return useQuery(query)
}
