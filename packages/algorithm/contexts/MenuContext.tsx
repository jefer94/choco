import React, { useEffect, useState, createContext, ReactElement, ReactChildren } from 'react'

const key = '__ALGORITHM_MENU__'

export const MenuContext = createContext({})

/**
 * @typedef {object} MenuContextProviderProps
 * @property {object} children - Menu context provider children.
 */

type MenuContextProviderProps = {
  readonly children: ReactChildren
}

/**
 * Menu context provider.
 *
 * @param {MenuContextProviderProps} Props - Props.
 * @returns {object} Menu context provider.
 */
export function MenuContextProvider({ children }: MenuContextProviderProps): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(!!localStorage.getItem(key) || false)

  useEffect(() => {
    const value = JSON.stringify(isOpen)
    localStorage.setItem(key, value)
  }, [isOpen])

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const MenuContextConsumer = MenuContext.Consumer
