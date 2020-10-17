import React, { ReactElement } from 'react'
import Head from '../components/Head'
import MenuContainer from '../containers/MenuContainer'
import NewProjectContainer from '../containers/NewProjectContainer'

/**
 * New project page.
 * @example
 * ```
 * import React from 'react'
 * import Docs from '/containers/Docs'
 * const component = <Docs />
 * ```
 * @returns New project page.
 */
export default function NewProject(): ReactElement {
  return (
    <>
      <Head title="Algorithm - Projects" />
      <MenuContainer>
        <NewProjectContainer />
      </MenuContainer>
    </>
  )
}
