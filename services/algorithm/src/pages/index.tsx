import React, { ReactElement } from 'react'
import EditorContainer from '../containers/EditorContainer'
import Head from '../components/Head'
import MenuContainer from '../containers/MenuContainer'

/**
 * Index page.
 * @returns Index page.
 */
export default function Index(): ReactElement {
  return (
    <>
      <Head title="Algorithm" />
      <MenuContainer>
        <EditorContainer />
      </MenuContainer>
    </>
  )
}
