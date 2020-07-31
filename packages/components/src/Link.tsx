import React, { ReactElement, ReactNode } from 'react'
import ServerLink from 'next/link'

/**
 * @typedef {object} LinkProps
 * @property {string} to - Link to.
 * @property {object} children - Link children.
 */

type LinkProps = {
  readonly to: string
  readonly children: ReactNode
  // readonly children: ReactChildren
}

/**
 * Link component.
 *
 * @param {LinkProps} props - Link props.
 * @returns {object} Link component.
 */
export function Link({ to, children }: LinkProps): ReactElement {
  return (
    <ServerLink href={to}>
      {children}
    </ServerLink>
  )
}
