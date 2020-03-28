import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { faEdit, faTerminal, faBook } from '@fortawesome/free-solid-svg-icons'
import { homeRoute, docsRoute, consoleRoute } from '../globals/routes'
import keychain from '../libs/keychain'
import { ThemeContext, MenuContext } from '../contexts'
import MenuComponent from '../components/Menu'

function menuItem(url, name, icon, active) {
  return { id: keychain('menu'), url, name, icon, active }
}

function Menu({ children }) {
  const { theme } = useContext(ThemeContext)
  const { isOpen, setIsOpen } = useContext(MenuContext)
  const items = [
    menuItem(homeRoute, 'Menu', faEdit, true),
    menuItem(docsRoute, 'Docs', faBook),
    menuItem(consoleRoute, 'Console', faTerminal)
  ]

  return (
    <MenuComponent items={items} theme={theme} isOpen={isOpen} toggle={setIsOpen}>
      {children}
    </MenuComponent>
  )
}
Menu.propTypes = {
  children: PropTypes.node.isRequired
}

export default Menu
