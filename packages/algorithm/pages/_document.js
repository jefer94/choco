// import { Suspense } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { Loading } from '@choco/components'
// import 'next-offline'

class MyDocument extends Document {
  static async getInitialProps(ctx) {

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
          <link rel="preconnect" href="https://storage.googleapis.com" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Algorithm runtime emulator, like a IDE"
          />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          {/* <Suspense fallback={<Loading />}> */}
            <NextScript />
          {/* </Suspense> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument