import React from 'react'
import PropsTypes from 'prop-types'
import { algorithmTranspilerLang } from '@choco/algorithm-transpiler'
import lang from '../lang'

import { ThemeContextProvider } from './ThemeContext' // eslint-disable-line
import { MenuContextProvider } from './MenuContext' // eslint-disable-line

// set locales
algorithmTranspilerLang()
lang()

function Provider({ children }) {
  return (
    <ThemeContextProvider>
      <MenuContextProvider>
        {children}
      </MenuContextProvider>
    </ThemeContextProvider>
  )
}
Provider.propTypes = {
  children: PropsTypes.node.isRequired
}

export * from './ThemeContext'
export * from './MenuContext'
export default Provider
