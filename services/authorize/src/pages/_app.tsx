import React, { ReactElement } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

/**
 * Next app.
 *
 * @param Props - Props.
 * @returns Next app.
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
