/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Line = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.pre`
  ${(v: Line) => (v.light ? 'color: #000000;' : v.dark ? 'color: #d4d4d4;' : '')}
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
`
