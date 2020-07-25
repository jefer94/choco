import React, { useContext, ReactElement, ReactNode } from 'react'
import { faEdit, faTerminal, faFolder, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { homeRoute, docsRoute, consoleRoute } from '../globals/routes'
import { ThemeContext } from '../contexts'
import { Menu, menuItem, MenuItemProps } from '../Components'

/**
 * @typedef {object} MenuContainerProps
 * @property {object} children - Menu context provider children.
 */

type MenuContainerProps = {
  readonly children: ReactNode
}

/**
 * Menu context provider.
 *
 * @param {MenuContainerProps} Props - Props.
 * @returns {object} Menu context provider.
 */
export function MenuContainer({ children }: MenuContainerProps): ReactElement {
  const { theme } = useContext(ThemeContext)
  const items: readonly MenuItemProps[] = [
    menuItem(homeRoute, faEdit, true),
    menuItem(consoleRoute, faFolder),
    menuItem(consoleRoute, faTerminal),
    menuItem(docsRoute, faQuestionCircle),
    menuItem(docsRoute, faCog)
  ]

  return (
    <Menu items={items} theme={theme}>
      {children}
    </Menu>
  )
}
