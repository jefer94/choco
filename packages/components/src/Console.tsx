import React, { ReactElement } from 'react'
// import './Console.sass'
import { Dictionary } from '@chocolab/types'
import styled from 'styled-components'
import { ConsoleLine, ConsoleLineProp } from './ConsoleLine'
// #393035

type Props = {
  readonly lines: readonly ConsoleLineProp[]
  readonly theme?: Dictionary
}

const Base = styled.div`
  margin-left: 20px;
`

/**
 * Console component, base in C/C++ style.
 *
 * @param props - Console props.
 * @example
 * ```
 * import React from 'react'
 * import Console from 'components/Console'
 *
 * const Component = () => <Console />
 * ```
 * @returns Doc.
 */
export function Console({ lines, theme = {} }: Props): ReactElement {
  return (
    <Base>
      { lines.map((line, key) => (
        <div key={line.id}>
          <ConsoleLine line={line} lineNumber={key} theme={theme} />
          {/* <br /> */}
        </div>
      )) }
    </Base>
  )
}
