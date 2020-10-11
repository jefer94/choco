/* eslint-disable jsx-a11y/anchor-is-valid */
import { forwardRef, MutableRefObject, ReactElement, ReactNode, useState } from 'react'
import MaterialUiLink from '@material-ui/core/Link'
import NextLink from 'next/link'

type CustomLinkProps = {
  readonly className: string
  readonly href: string
  readonly children: ReactNode
}

// eslint-disable-next-line react/prop-types
const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ className, href, children },
  ref): ReactElement => (
    <NextLink href={href}>
      <a className={className} ref={ref}>
        {children}
      </a>
    </NextLink>
))

type LinkProps = {
  readonly href: string
  readonly children: string
  readonly className?: string
}

export default function Link({ href, children, className }: LinkProps): ReactElement {
  return (
    <MaterialUiLink
      href={href}
      className={className}
      component={CustomLink}
      variant="body1"
      underline="always"
    >
      {children}
    </MaterialUiLink>
  )
}
