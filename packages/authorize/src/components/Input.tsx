import styled from 'styled-components'
import { FunctionComponent } from 'react'

const Div = styled.div`
  /* background: #000; */
  height: 36px;
  padding: 0;
  margin: 0;
  font-size: 12px;
`

function Wrapper(): FunctionComponent {
  return (
    <Div>
      <label>
        <span>asdasddas</span>
        <input value="aaaaa" readOnly />
      </label>
    </Div>
  )
}

export default Wrapper