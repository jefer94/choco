import { ReactElement } from 'react'
import styled from 'styled-components'

const Base = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #FF4C62;
`

type ErrorProps = {
  readonly error?: string
}

export default function Error({ error }: ErrorProps): ReactElement {
  return (
    error ? <Base>{error}</Base> : <></>
  )
}
