import React, { ReactElement, ReactNode } from 'react'
import { algorithmTranspilerLang } from '@chocolab/algorithm-transpiler'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import lang from '../lang'

import { ThemeContextProvider as OldThemeContextProvider } from './ThemeContext'
// import { ResizeContextProvider } from './ResizeContext'
import { GraphQlContextProvider } from './GraphQlContext'
import { purple } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/core'

// set locales
algorithmTranspilerLang()
lang()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#30B1DA',
      contrastText: '#fff'
    }
  }
})

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
      <ThemeProvider theme={theme}>
        <OldThemeContextProvider>
          {children}
        </OldThemeContextProvider>
      </ThemeProvider>
    </GraphQlContextProvider>
  )
}

export * from './ThemeContext'
export default Provider
