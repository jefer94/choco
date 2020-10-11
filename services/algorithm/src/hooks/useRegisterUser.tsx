import { gql, useMutation, MutationTuple } from '@apollo/client'

type Auth = {
  readonly token: string
  readonly user: string
}

type AuthVariables = {
  readonly username: string
  readonly password: string
  readonly email: string
}

const query = gql`
  mutation RegisterUser($input: UserInput!) {
    register(input: $input) {
      token
    }
  }
`

export function useRegisterUser(): MutationTuple<{ readonly register: Auth }, {
  readonly input: AuthVariables }> {
  return useMutation(query)
}
