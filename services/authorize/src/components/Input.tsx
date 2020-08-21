import styled from 'styled-components'
import { ReactElement } from 'react'

const Div = styled.div`
  /* background: #000; */
  height: 36px;
  padding: 0;
  margin: 0;
  font-size: 12px;
`

type Props = {
  readonly value: string
  readonly onChange?: (value: string) => void
}

function Wrapper({ value, onChange }: Props): ReactElement {
  return (
    <Div>
      {/* <label> */}
      <label>asdasddas</label>
      {/* <span>asdasddas</span> */}
      {onChange ?
        <input value={value} readOnly onChange={(v) => onChange(v.target.value)} /> :
        <input value={value} readOnly />}
      {/* </label> */}
    </Div>
  )
}

export default Wrapper