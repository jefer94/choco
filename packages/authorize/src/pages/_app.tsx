import React, { ReactElement } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

/**
 * @typedef {object} AppProps
 * @property {object} Component - Next component.
 * @property {object} pageProps - Next component props.
 */

/**
 * Next app.
 *
 * @param {AppProps} Props - Props.
 * @returns {object} Next app.
 */
export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}