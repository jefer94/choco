import React, { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'

const Provider = dynamic(() => import('../contexts'), { ssr: false })

/**
 * Next app.
 * @param Props - Props.
 * @returns Next app.
 */
export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <CssBaseline />
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
