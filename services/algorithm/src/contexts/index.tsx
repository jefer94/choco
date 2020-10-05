import React, { ReactElement, ReactNode } from 'react'
import { algorithmTranspilerLang } from '@chocolab/algorithm-transpiler'
import lang from '../lang'

import { ThemeContextProvider } from './ThemeContext'
// import { ResizeContextProvider } from './ResizeContext'
import { GraphQlContextProvider } from './GraphQlContext'

// set locales
algorithmTranspilerLang()
lang()

type ProviderProps = {
  readonly children: ReactNode
}

/**
 * Contexts provider.
 * @param Props - Props.
 * @returns Contexts provider.
 */
function Provider({ children }: ProviderProps): ReactElement {
  return (
    <GraphQlContextProvider>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </GraphQlContextProvider>
  )
}

export * from './ThemeContext'
export default Provider
