import React, { ReactElement } from 'react'
import { Docs as DocsComponent } from '@chocolab/components'
import Head from '../components/Head'
import { MenuContainer } from '../containers/MenuContainer'
import FilesContainer from '../containers/FilesContainer'

/**
 * Projects page.
 * @example
 * import React from 'react'
 * import Docs from '/containers/Docs'
 * const component = <Docs />
 * @returns Projects page.
 */
export default function Docs(): ReactElement {
  return (
    <>
      <Head title="Algorithm - Docs" />
      {/* <MenuContainer> */}
      <FilesContainer />
      <DocsComponent />
      {/* </MenuContainer> */}
    </>
  )
}
