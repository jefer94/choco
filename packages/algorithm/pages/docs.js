import React, { useContext } from 'react'
import Head from 'next/head'
import DocsComponent from '../components/Docs'
import Menu from '../containers/Menu'
import { ThemeContext } from '../contexts'

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
export default function () {
  const { theme } = useContext(ThemeContext) || {}
  return (
    <>
      <Head>
        <title>Algorithm - Docs</title>
      </Head>
      <Menu theme={theme}>
        <DocsComponent />
      </Menu>
    </>
  )
}
