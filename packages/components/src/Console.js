import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import './Console.sass'
import ConsoleLine from './ConsoleLine'
// #393035

/** @module components/Console */

/**
 * @typedef {object} Line
 * @property {string} id - Doc key.
 * @property {string} value - Doc name.
 * @property {string} var - Doc description.
 */

/**
 * @typedef {object} ConsoleProps
 * @property {Line[]} lines - Doc key.
 */

/**
 * Console component, base in C/C++ style.
 *
 * @param {ConsoleProps} props - Doc name.
 * @example
 * import React from 'react'
 * import Console from 'components/Console'
 *
 * const Component = () => <Console />
 * @returns {object} Doc.
 */
function Console({ lines, theme }) {
  return (
    <main id="content2" className="tab">
      <div className="console">
        { lines.map((line, key) => (
          <div key={line.id}>
            <ConsoleLine line={line} lineNumber={key} theme={theme} />
            <br />
          </div>
        )) }
      </div>
    </main>
  )
}
Console.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  lines: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Console
