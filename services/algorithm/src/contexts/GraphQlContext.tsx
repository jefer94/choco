import React, { ReactElement, ReactNode } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

type GraphQlContextProviderProps = {
  readonly children: ReactNode
}

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
