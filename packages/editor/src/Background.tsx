/* eslint-disable no-nested-ternary */
import styled from 'styled-components'

type Background = {
  readonly light?: boolean
  readonly dark?: boolean
}

export default styled.div`
  ${(v: Background) => (v.light ? 'background-color: #ffffff;' : v.dark ? 'background-color: #1e1e1e;' : '')}
  height: calc(100vh - 48px);
  overflow: auto;
`
