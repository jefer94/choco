import React, { ReactElement } from 'react'
import Head from '../components/Head'
import MenuContainer from '../containers/MenuContainer'
import ProjectsContainer from '../containers/ProjectsContainer'

/**
 * Projects page.
 * @example
 * ```
 * import React from 'react'
 * import Docs from '/containers/Docs'
 * const component = <Docs />
 * ```
 * @returns Projects page.
 */
export default function Projects(): ReactElement {
  return (
    <>
      <Head title="Algorithm - Projects" />
      <MenuContainer>
        <ProjectsContainer />
      </MenuContainer>
    </>
  )
}
