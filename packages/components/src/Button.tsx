import styled from 'styled-components' // eslint-disable-line

export const Button = styled.button`
  margin: 0;
  padding: 10px;
  outline: 0;
  background-color: transparent;
  border: 2px solid ${(v) => (v.color ? v.color : '#000')};
`
