import React, { useEffect, useState, createContext } from 'react'
import PropsTypes from 'prop-types'
// import { setVar } from '../libs/css'

const key = '__ALGORITHM_MENU__'

// function setCssVars(theme) {
//   setVar('--ion-background-color', theme.surface)
// }

export const MenuContext = createContext({})

export function MenuContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(localStorage.getItem(key) || false)

  useEffect(() => {
    localStorage.setItem(key, isOpen)
  }, [isOpen])

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}
MenuContextProvider.propTypes = {
  children: PropsTypes.node.isRequired
}

export const MenuContextConsumer = MenuContext.Consumer
