import { gql, useQuery, QueryResult } from '@apollo/client'

type Code = {
  readonly _id: string
  readonly title: string
  readonly code: string
}

const query = gql`
  query FetchSharedCodes($project: ID!) {
    sharedCodes(project: $project) {
      _id
      title
      code
    }
  }
`

export function useFetchSharedCodes(project: string): QueryResult<readonly Code[]> {
  return useQuery(query, { variables: { project } })
  //
}
