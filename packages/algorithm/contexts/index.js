import React from 'react'
import PropsTypes from 'prop-types'
import { ThemeContextProvider } from './ThemeContext' // eslint-disable-line
import { MenuContextProvider } from './MenuContext' // eslint-disable-line

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
