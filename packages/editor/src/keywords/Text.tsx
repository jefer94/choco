/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Text = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.span`
  ${(v: Text) => (v.light ? 'color: #000000;' : v.dark ? 'color: #d4d4d4;' : '')}
`
