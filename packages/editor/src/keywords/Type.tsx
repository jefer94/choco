/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Type = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.span`
  ${(v: Type) => (v.light ? 'color: #267f99;' : v.dark ? 'color: #4ec9b0;' : '')}
`
