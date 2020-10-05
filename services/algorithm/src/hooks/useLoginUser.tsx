import { gql, useQuery, QueryResult } from '@apollo/client'

type Code = {
  readonly _id: string
  readonly title: string
  readonly code: string
}

const query = gql`
  query LoginUser($username: String!, $password: String!) {
    generateToken(username: $username, password: $password) {
      token
    }
  }
`

export function useFetchCodes(username: string, password: string): QueryResult<Code> {
  return useQuery(query, { variables: { username, password } })
}
