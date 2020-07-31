import React, { ReactElement } from 'react'
import styled from 'styled-components' // eslint-disable-line
import theme from './theme'

const circleSize = 200

const Header = styled.header`
  background-color: ${theme.dark};
  position: relative;
  padding-top: 20px;
  width: 100vw;
  height: ${circleSize + 80}px;
  border-bottom: 6px solid ${theme.blue};
`

const Aside = styled.aside`
  background-color: ${theme.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 569px;
  height: 100vh;
  border-right: 6px solid ${theme.blue};
`

const BrandCircle = styled.div`
  font-family: 'Piedra', cursive;
  width: ${circleSize}px;
  height: ${circleSize}px;
  display: inline-block;
  /* position: absolute; */
  background-color: ${theme.white};
  color: ${theme.dark};
  font-size: 190px;
  line-height: 222px;
  border-radius: ${circleSize / 2}px;
  align-items: center;
  text-align: center;
`

const BrandName = styled.h1`
  font-family: 'Poor Story', cursive;
  margin: 12px 0 24px 0;
  font-size: 36px;
  line-height: 45px;
  color: ${theme.white};
  text-align: center;
`

const BrandSpaceHeader = styled.div`
  width: 100vw;
  height: ${circleSize}px;
  text-align: center;
`

const BrandSpaceAside = styled.div`
  text-align: center;
  height: 252px;
`

type BrandType = 'Header' | 'Aside'
type BrandSectionProps = {
  readonly type: BrandType
}

export function BrandSection({ type }: BrandSectionProps): ReactElement {
  const Root = type === 'Aside' ? Aside : Header
  const Space = type === 'Aside' ? BrandSpaceAside : BrandSpaceHeader
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Piedra&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap" rel="stylesheet" />
      <Root>
        <Space>
          <BrandCircle>C</BrandCircle>
          <BrandName>Choco Algorithm</BrandName>
        </Space>
      </Root>
    </>
  )
}
