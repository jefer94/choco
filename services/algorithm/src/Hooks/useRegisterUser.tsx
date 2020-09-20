import { gql, useMutation, MutationTuple } from '@apollo/client'

type Auth = {
  readonly _id: string
  readonly name: string
  readonly description: string
}

type AuthVariables = {
  readonly input: {
    readonly username: string
    readonly password: string
    readonly email: string
  }
}

const query = gql`
  mutation RegisterUser($input: UserInput!) {
    register(input: $input) {
      token
    }
  }
`

export function useRegisterUser(): MutationTuple<Auth, AuthVariables> {
  return useMutation(query)
}
