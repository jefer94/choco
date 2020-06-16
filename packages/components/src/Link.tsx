import React, { useState, ReactElement, ReactChildren } from 'react'
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

type Props = {
  readonly to: string
  readonly children: ReactChildren
}

/**
 * Link.
 *
 * @param {LinkProps} props - Link props.
 * @example
 * <Link to="#" />
 * @returns {object} <Editor ... />
 */
export default function Link({ to, children }: Props): ReactElement {
  return (
    <ServerLink href={to}>
      {children}
    </ServerLink>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}
