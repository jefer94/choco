import React, { useContext, ReactElement, ReactNode } from 'react'
import { faEdit, faTerminal, faFolder, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Menu, menuItem } from '@choco/components'
import { homeRoute, docsRoute, consoleRoute } from '../globals/routes'
import { ThemeContext } from '../contexts'

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
  const top = [
    menuItem(homeRoute, faEdit, true),
    menuItem(consoleRoute, faFolder),
    menuItem(consoleRoute, faTerminal)
  ]
  const bottom = [
    menuItem(docsRoute, faQuestionCircle),
    menuItem(docsRoute, faCog)
  ]

  return (
    <Menu topItems={top} bottomItems={bottom} theme={theme}>
      {children}
    </Menu>
  )
}
