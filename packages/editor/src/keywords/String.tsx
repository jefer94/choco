/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type String = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.span`
  ${(v: String) => (v.light ? 'color: #a31515;' : v.dark ? 'color: #ce9178;' : '')}
`
