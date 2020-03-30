import React, { useState } from 'react'
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

export default function Link({ to, children }) {
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