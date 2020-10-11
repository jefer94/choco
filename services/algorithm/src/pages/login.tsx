import React, { ReactElement } from 'react'
import { BrandSection } from '@chocolab/components'
import Head from '../components/Head'
import LoginContainer from '../containers/LoginContainer'
// import '../global-styles.css'

/**
 * Login container.
 * @returns Login container.
 */
export default function Login(): ReactElement {
  // router.prefetch('/dashboard')
  return (
    <>
      <Head title="Algorithm - Register" />
      <BrandSection type="Aside" />
      <LoginContainer />
    </>
  )
}
