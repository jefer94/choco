import { gql, useQuery, QueryResult } from '@apollo/client'

type Project = {
  readonly _id: string
  readonly name: string
  readonly description: string
}

const query = gql`
  query FetchProjects {
    projects {
      _id
      name
      description
    }
  }
`

export function useFetchProjects(): QueryResult<{ readonly projects: readonly Project[] }> {
  return useQuery(query)
}
