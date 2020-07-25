import React, { ReactElement } from 'react'
// import './Console.sass'
import { Dictionary } from '@choco/types'
import { ConsoleLine, ConsoleLineProp } from './ConsoleLine'
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

type Props = {
  readonly lines: readonly ConsoleLineProp[]
  readonly theme?: Dictionary
}

/**
 * Console component, base in C/C++ style.
 *
 * @param {ConsoleProps} props - Console props.
 * @example
 * import React from 'react'
 * import Console from 'components/Console'
 *
 * const Component = () => <Console />
 * @returns {object} Doc.
 */
export function Console({ lines, theme = {} }: Props): ReactElement {
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
