/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Number = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.span`
  ${(v: Number) => (v.light ? 'color: #098658;' : v.dark ? 'color: #b5cea8;' : '')}
`
