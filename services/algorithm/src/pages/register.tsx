import React, { ReactElement } from 'react'
import Head from 'next/head'
import { BrandSection } from '@chocolab/components'
import RegisterContainer from '../Containers/RegisterContainer'
import '../global-styles.css'

/**
 * Login container.
 * @returns Login container.
 */
export default function Login(): ReactElement {
  // router.prefetch('/dashboard')
  return (
    <>
      <Head>
        <title>Algorithm - Docs</title>
      </Head>
      <BrandSection type="Aside" />
      <RegisterContainer />
    </>
  )
}
