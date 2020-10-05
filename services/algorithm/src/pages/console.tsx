import React, { ReactElement } from 'react'
import Head from '../components/Head'
import MenuContainer from '../containers/MenuContainer'
import ConsoleContainer from '../containers/ConsoleContainer'

export default function Console(): ReactElement {
  return (
    <>
      <Head title="Algorithm - Console" />
      <MenuContainer>
        <ConsoleContainer />
      </MenuContainer>
    </>
  )
}
