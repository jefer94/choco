import React, { useContext } from 'react'
import Head from 'next/head'
import { Docs as DocsComponent } from '../Components'
// import Menu from '../containers/Menu'
import { ThemeContext } from '../contexts'

function PrintNames({ names = [] }) {
  return (
    <ol>
      {/* use name as key for dom caching */}
      {names.sort().map((v) => <li key={v}>{v}</li>)}
    </ol>
  )
}

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
  return (
    <>
      <Head>
        <title>Algorithm - Docs</title>
      </Head>
      <PrintNames names={["Barbara", "Carla", "Andres", ]} />
    </>
  )
}
