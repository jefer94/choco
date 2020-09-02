/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Handler = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.span`
  ${(v: Handler) => (v.light ? 'color: #af00db;' : v.dark ? 'color: #c586c0;' : '')}
`
