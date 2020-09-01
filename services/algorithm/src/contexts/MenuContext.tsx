import React, { useEffect, useState, createContext, ReactElement, ReactNode } from 'react'

const key = '__ALGORITHM_MENU__'

export const MenuContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => { console.log('set is open', isOpen) }
})

type MenuContextProviderProps = {
  readonly children: ReactNode
}

/**
 * Menu context provider.
 *
 * @param Props - Props.
 * @returns Menu context provider.
 */
export function MenuContextProvider({ children }: MenuContextProviderProps): ReactElement {
  const [isOpen, localSetIsOpen] = useState<boolean>(!!localStorage.getItem(key) || false)

  useEffect(() => {
    const value = JSON.stringify(isOpen)
    localStorage.setItem(key, value)
  }, [isOpen])

  function setIsOpen(isOpen: boolean): void {
    localSetIsOpen(isOpen)
  }

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const MenuContextConsumer = MenuContext.Consumer
