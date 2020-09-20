import React, { ReactElement } from 'react'
import Head from 'next/head'
import { BrandSection } from '@chocolab/components'

/**
 * Login container.
 * @returns {object} Login container.
 */
export default function Login(): ReactElement {
  // router.prefetch('/dashboard')
  return (
    <>
      <Head>
        <title>Algorithm - Docs</title>
      </Head>
      {/* <BrandSection type="Header" /> */}
      <BrandSection type="Aside" />
    </>
  )
}
