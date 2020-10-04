import React, { ReactElement } from 'react'
import { BrandSection } from '@chocolab/components'
import Head from '../components/Head'

/**
 * Login container.
 * @returns Login container.
 */
export default function Login(): ReactElement {
  // router.prefetch('/dashboard')
  return (
    <>
      <Head title="Algorithm - Login" />
      {/* <BrandSection type="Header" /> */}
      <BrandSection type="Aside" />
      <input type="text" />
    </>
  )
}
