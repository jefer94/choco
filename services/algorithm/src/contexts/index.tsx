import React, { ReactElement, ReactNode } from 'react'
import { algorithmTranspilerLang } from '@choco/algorithm-transpiler'
import lang from '../lang'

import { ThemeContextProvider } from './ThemeContext' // eslint-disable-line
import { MenuContextProvider } from './MenuContext' // eslint-disable-line
import { ResizeContextProvider } from './ResizeContext' // eslint-disable-line

// set locales
algorithmTranspilerLang()
lang()

/**
 * @typedef {object} ProviderProps
 * @property {object} children - Provider children.
 */

type ProviderProps = {
  readonly children: ReactNode
}

/**
 * Contexts provider.
 *
 * @param {ProviderProps} Props - Props.
 * @returns {object} Contexts provider.
 */
function Provider({ children }: ProviderProps): ReactElement {
  return (
    <ThemeContextProvider>
      <MenuContextProvider>
        {children}
      </MenuContextProvider>
    </ThemeContextProvider>
  )
}

export * from './ThemeContext'
export * from './MenuContext'
export default Provider
