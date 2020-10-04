import { ReactElement } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  display: inline-block;
  width: 170px;
  height: 154px;
  margin-left: 10px;
  margin-right: 10px;
  /* &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  } */
`

const IconBox = styled.div`
  margin: 0 35px;
  padding-top: 20px;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
`

const Icon = styled.div`
  background-color: #fff;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  margin: 20px;
  margin-top: 0;
`

const Text = styled.div`
  font-family: Poor Story;
  font-size: 26px;
  line-height: 32px;
  width: 170px;
  align-items: center;
  text-align: center;
  top: 100px;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export default function Functionality(): ReactElement {
  return (
    <Box>
      <IconBox>
        <Icon>a</Icon>
      </IconBox>
      <Text>Asdasdasd</Text>
    </Box>
  )
}
