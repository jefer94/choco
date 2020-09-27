import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Docs as DocsComponent } from '@chocolab/components'
import { MenuContainer } from '../Containers/MenuContainer'
import ProjectsContainer from '../Containers/ProjectsContainer'

/**
 * Get a Docs inside of Menu.
 * @example
 * import React from 'react'
 * import Docs from '/containers/Docs'
 * const component = <Docs />
 * @returns <Docs />
 */
export default function Docs(): ReactElement {
  return (
    <>
      <Head>
        <title>Algorithm - Projects</title>
      </Head>
      <MenuContainer>
        <ProjectsContainer />
      </MenuContainer>
    </>
  )
}
