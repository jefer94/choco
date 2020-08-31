/* eslint-disable functional/no-class */
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'
import { ReactElement } from 'react'
// import 'next-offline'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
          <link rel="preconnect" href="https://storage.googleapis.com" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="manifest" href="/manifest.json" />

          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/editor/editor.main.js" integrity="sha512-vD1ifhYyIEQYZJguKoErn/aCjrmj73YSeKXO59JLt8RFrw95Hpx2hgcEvvj5VuSnR3oRBd2YZLUw0HreEx1uHw==" crossOrigin="anonymous" /> */}
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
          <NextScript />
        </body>
      </Html>
    )
  }
}
