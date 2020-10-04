import React, { ReactElement } from 'react'
import DocumentHead from 'next/head'

type HeadProps = {
  readonly title: string
}

/**
 * Document head component.
 * @example
 * ```
 * import React from 'react'
 * import Docs from '/containers/Docs'
 * const component = <Docs />
 * ```
 * @returns Document head component.
 */
export default function Head({ title }: HeadProps): ReactElement {
  return (
    <DocumentHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* <link rel="preconnect" href="https://storage.googleapis.com" /> */}
      {/* <link rel="preconnect" href="https://cdn.jsdelivr.net" /> */}
      <link rel="manifest" href="/manifest.json" />

      <link href="https://fonts.googleapis.com/css2?family=Piedra&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Algorithm runtime emulator, like a IDE"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    </DocumentHead>
  )
}
