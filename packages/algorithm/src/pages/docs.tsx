import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Docs as DocsComponent } from '@choco/components'
import { MenuContainer } from '../Containers/MenuContainer'

/**
 * Get a Docs inside of Menu.
 *
 * @example
 * import React from 'react'
 * import Docs from '/containers/Docs'
 *
 * const component = <Docs />
 * @returns {object} <Docs />
 */
export default function Docs(): ReactElement {
  return (
    <>
      <Head>
        <title>Algorithm - Docs</title>
      </Head>
      <MenuContainer>
        <DocsComponent />
      </MenuContainer>
    </>
  )
}
