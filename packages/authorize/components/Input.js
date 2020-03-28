import styled from 'styled-components'

const Div = styled.div`
  /* background: #000; */
  height: 36px;
  padding: 0;
  margin: 0;
  font-size: 12px;
`

function Wrapper() {
  return (
    <Div>
      <label>
        <span>asdasddas</span>
        <input value="aaaaa" />
      </label>
    </Div>
  )
}

export default Wrapper