import React, { ReactElement, ReactNode } from 'react'
import ServerLink from 'next/link'

type LinkProps = {
  readonly to: string
  readonly children: ReactNode
  // readonly children: ReactChildren
}

/**
 * Link component.
 *
 * @param props - Link props.
 * @returns Link component.
 */
export function Link({ to, children }: LinkProps): ReactElement {
  return (
    <ServerLink href={to}>
      {children}
    </ServerLink>
  )
}
