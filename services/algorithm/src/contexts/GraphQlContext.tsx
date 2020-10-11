import React, { ReactElement, ReactNode } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

type GraphQlContextProviderProps = {
  readonly children: ReactNode
}

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('T__T__T')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

/**
 * GraphQL context provider.
 * @param Props - Props.
 * @returns Menu context provider.
 */
export function GraphQlContextProvider({ children }: GraphQlContextProviderProps):
  ReactElement {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
