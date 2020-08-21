import React, { useEffect, useState, createContext, ReactNode, ReactElement, Dispatch, SetStateAction } from 'react'

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

type Theme = typeof darkMode

type ThemeContextProps = {
  readonly mode: string
  readonly setMode: Dispatch<SetStateAction<string>>
  readonly theme: Theme
  readonly setTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextProps>(null)

/**
 * @typedef {object} ThemeContextProviderProps
 * @property {object} children - Theme context provider children.
 */

type ThemeContextProviderProps = {
  readonly children: ReactNode
}

/**
 * Theme context provider.
 *
 * @param {ThemeContextProviderProps} Props - Props.
 * @returns {object} Theme context provider.
 */
export function ThemeContextProvider({ children }: ThemeContextProviderProps): ReactElement {
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

export const ThemeContextConsumer = ThemeContext.Consumer
