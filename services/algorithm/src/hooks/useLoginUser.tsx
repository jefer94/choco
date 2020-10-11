import { gql, useLazyQuery, QueryTuple } from '@apollo/client'

type Auth = {
  readonly generateToken: {
    readonly token: string
    readonly user: string
  }
}

type AuthVariables = {
  readonly username: string
  readonly password: string
}

const query = gql`
  query LoginUser($username: String!, $password: String!) {
    generateToken(username: $username, password: $password) {
      token
    }
  }
`

export function useLoginUser(): QueryTuple<Auth, AuthVariables> {
  return useLazyQuery(query)
}
