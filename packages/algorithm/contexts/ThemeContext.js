import React, { useEffect, useState, createContext } from 'react'
import PropsTypes from 'prop-types'
// import { setVar } from '../libs/css'

const key = '__ALGORITHM_THEME__'

export const darkMode = {
  textTab: '#6B717D',
  tabSurface: '#252526',
  tabHighlighter: '#568AF2',
  tabTextOpaque: '#6B717D',
  color: '#D7DAE0',
  // --color: #f4f5f8
  surface: '#202124',
  surfaceBorder: '#181C24',
  white: '#D7DAE0',
  oracle: '#f50',
  fontSize: '14px',
  lineHeight: '21px'
}

// function setCssVars(theme) {
//   setVar('--ion-background-color', theme.surface)
// }

export const ThemeContext = createContext({ theme: {} })

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem(key) || 'dark')
  const [theme, setTheme] = useState(darkMode)

  useEffect(() => {
    localStorage.setItem(key, mode)

    switch (mode) {
      case 'dark':
        // setCssVars(darkMode)
        setTheme(darkMode)
        break

      default:
        // setCssVars(darkMode)
        setTheme(darkMode)
    }
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
ThemeContextProvider.propTypes = {
  children: PropsTypes.node.isRequired
}

export const ThemeContextConsumer = ThemeContext.Consumer
