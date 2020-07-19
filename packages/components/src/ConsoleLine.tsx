import React, { memo, ReactElement } from 'react'
import PropTypes from 'prop-types'
// import './Console.sass'
import styled from 'styled-components'
import { Dictionary } from '@choco/types'
// #393035

/** @module components/Console */

/**
 * @typedef {object} Line
 * @property {string} id - Line id.
 * @property {string} value - Line value.
 * @property {string} var - Line var.
 */

/**
 * @typedef {object} ConsoleProps
 * @property {Line} line - Line.
 * @property {number} lineNumber - Line number.
 */

const LineWrapper = styled.div`
  font-family: monospace;
  font-size: {(v) => v.theme.fontSize};
  line-height: {(v) => v.theme.lineHeight};
  white-space: pre-wrap;
  word-break: normal;
  word-wrap: break-word;
  cursor: text;
  padding: 0px 4px 0px 0px;
`

type LineProps = {
  readonly firstLine?: boolean
}

const Line = styled.div`
  display: inline;
  float: left;
  margin: ${(v: LineProps) => (v.firstLine ? 0 : 'unset')};
  padding: ${(v: LineProps) => (v.firstLine ? '0 10px 0 0' : 'unset')};
  color: ${(v: LineProps) => (v.firstLine ? '#537f7e' : 'unset')};
  margin-left: ${(v: LineProps) => (!v.firstLine ? 0 : 'unset')};
`

export type ConsoleLineProp = {
  readonly id: string
  readonly value: string
  readonly var: string
  readonly content: string
}

type Props = {
  readonly theme: Dictionary
  readonly line: ConsoleLineProp
  readonly lineNumber: number
}

/**
 * Console component, base in C/C++ style.
 *
 * @param {ConsoleProps} props - Console line props.
 * @example
 * import React from 'react'
 * import Console from 'components/Console'
 *
 * const Component = () => <Console />
 * @returns {object} Doc.
 */
export function ConsoleLine({ theme = {}, line, lineNumber }: Props): ReactElement {
  return (
    <LineWrapper theme={theme}>
      { lineNumber === 0 ? (
        <Line as="p" firstLine>
          ~ λ
        </Line>
      ) : ''}
      <Line>
        { line.content ? <p>{ line.content }</p> : '' }
        { line.var ?
          <p className="var">{ line.var }</p> : ''}
      </Line>
    </LineWrapper>
  )
}
const line = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  var: PropTypes.string
}
