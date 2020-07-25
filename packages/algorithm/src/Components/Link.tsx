import React, { ReactElement, ReactNode } from 'react'
import PropTypes from 'prop-types'
import ServerLink from 'next/link'
// import { Link as BrowserLink } from 'react-router-dom'

// const Link = typeof window !== 'undefined' ? BrowserLink : ServerLink

// export default function Link({ to, children }) {
//   const [isBrowserLink] = useState(typeof window !== 'undefined')

//   if (isBrowserLink) return (
//     <Link to={to}>
//       {children}
//     </Link>
//   )
//   else return (
//     <Link href={to}>
//       {children}
//     </Link>
//   )
// }

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
 * Link.
 *
 * @param {LinkProps} props - Link props.
 * @example
 * <Link to="#" />
 * @returns {object} <Editor ... />
 */
export function Link({ to, children }: LinkProps): ReactElement {
  return (
    <ServerLink href={to}>
      {children}
    </ServerLink>
  )
}
