import React, { ReactElement } from 'react'
import Head from '../components/Head'
import MenuContainer from '../containers/MenuContainer'

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
      <MenuContainer>
        <></>
      </MenuContainer>
    </>
  )
}
