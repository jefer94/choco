import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import './Console.sass'
import styled from 'styled-components'
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

const Line = styled.div`
  display: inline;
  float: left;
  margin: {(v) => v.firstLine ? 0 : 'unset'};
  padding: {(v) => v.firstLine ? '0 10px 0 0' : 'unset'};
  color: {(v) => v.firstLine ? '#537f7e' : 'unset'};
  margin-left: {(v) => !v.firstLine ? 0 : 'unset'};
`

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
function ConsoleLine({ theme, line, lineNumber }) {
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
ConsoleLine.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  line: PropTypes.shape(line).isRequired,
  lineNumber: PropTypes.number.isRequired
}

export default ConsoleLine
