/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Comment = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.span`
  ${(v: Comment) => (v.light ? 'color: #008000;' : v.dark ? 'color: #6a9955;' : '')}
`
