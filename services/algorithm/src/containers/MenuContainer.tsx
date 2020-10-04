import React, { useContext, ReactElement, ReactNode } from 'react'
import { faEdit, faTerminal, faFolder, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Menu, menuItem } from '@chocolab/components'
import { homeRoute, docsRoute, consoleRoute, projectsRoute } from '../globals/routes'
import { ThemeContext } from '../contexts'

type MenuContainerProps = {
  readonly children: ReactNode
}

/**
 * Menu context provider.
 * @param Props - Props.
 * @returns Menu context provider.
 */
export function MenuContainer({ children }: MenuContainerProps): ReactElement {
  const { theme } = useContext(ThemeContext)
  const top = [
    menuItem(homeRoute, faEdit, true),
    menuItem(projectsRoute, faFolder),
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
