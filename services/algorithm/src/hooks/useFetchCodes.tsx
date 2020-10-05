import { gql, useQuery, QueryResult } from '@apollo/client'

type Code = {
  readonly _id: string
  readonly title: string
  readonly code: string
}

const query = gql`
  query FetchCodes($project: ID!) {
    codes(project: $project) {
      _id
      title
      code
    }
  }
`

export function useFetchCodes(project: string): QueryResult<readonly Code[]> {
  return useQuery(query, { variables: { project } })
  //
}
