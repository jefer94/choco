import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Head from '../components/Head'
import Functionality from '../components/Functionality'
import theme from '../theme'

const Navbar = styled.nav`
  width: 100vw;
  height: 48px;
  background: ${theme.dark};
`

type NavbarSectionProps = {
  readonly type: 'left' | 'right'
}

const NavbarSection = styled.div`
  font-weight: bold;
  height: 48px;
  font-size: 18px;
  line-height: 48px;
  color: #fff;
  font-family: Poor Story;
  display: inline-block;
  left: ${(v: NavbarSectionProps) => (v.type === 'left' ? '100px' : 'unset')};
  right: ${(v: NavbarSectionProps) => (v.type === 'right' ? '100px' : 'unset')};
  position: absolute;
  margin: 0;
  li {
    display: inline;
    text-decoration-line: underline;
    margin-left: 15px;
    margin-right: 15px;
    a {
      color: #fff;
    }
  }
  li:first-child {
    margin-left: 0px;
  }
  li:last-child {
    margin-right: 0px;
  }
`

const Background = styled.div`
  padding: 0 100px;
  width: 100vw;
  height: calc( 100vh - 48px );
  right: 0;
  background: url(background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
`

const ActionBox = styled.div`
  width: 500px;
  display: flex;
  height: calc( 100vh - 66px );
  align-items: center;
  top: 48px;
  position: absolute;
  left: 100px;
`

const ActionGroup = styled.div`
  width: 500px;
  align-items: center;
`

const CaptureBox = styled.div`
  height: calc( 100vh - 66px );
  width: calc( 100vw - 500px );
  max-width: 760px;
  align-items: center;
  display: inline-flex;
  top: 48px;
  position: absolute;
  right: 100px;
`

const Capture = styled.img`
  width: calc( 100vw - 500px );
  max-width: 760px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const ActionTitle = styled.h1`
  text-align: center;
  font-size: 26px;
  letter-spacing: 3px;
  line-height: 34px;
  color: #fff;
  font-family: Piedra;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ActionText = styled.p`
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 23px;
  color: #fff;
  font-family: Piedra;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ActionButton = styled.button`
  width: 226px;
  height: 60px;
  font-size: 26px;
  line-height: 34px;
  margin: 0px;
  padding: 0px;
  background: ${theme.blue};
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-style: none;
  border-radius: 8px;
  border-color: ${theme.blue};
  font-family: Piedra;
`

const Container = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
`

const BrandBox = styled.div`
  width: 48px;
  height: 48px;
  display: inline;
`

const BrandIcon = styled.span`
  margin: 8px 0;
  background: #fff;
  color: ${theme.dark};
  width: 32px;
  height: 32px;
  text-align: center;
  align-items: center;
  border-radius: 16px;
  font-size: 27px;
  display: inline-block;
  line-height: 38px;
  font-family: Piedra;
`

const BrandText = styled.div`
  font-weight: bold;
  height: 48px;
  font-size: 18px;
  line-height: 48px;
  color: #fff;
  font-family: Poor Story;
  display: inline-block;
  left: 140px;
  position: absolute;
  margin: 0;
`

const FunctionalityBox = styled.div`
  margin-top: 100px;
  width: 600px;
`

/**
 * Login container.
 * @returns {object} Login container.
 */
export default function Landing(): ReactElement {
  // router.prefetch('/dashboard')
  return (
    <>
      <Head title="Algorithm" />
      <Container>
        <Navbar>
          <NavbarSection type="left">
            <BrandBox>
              <BrandIcon>C</BrandIcon>
            </BrandBox>
            {/* Choco Algorithm */}
          </NavbarSection>
          <BrandText>Choco Algorithm</BrandText>
          <NavbarSection type="right" as="ul">
            <li>
              <a href="/">Registrarse</a>
            </li>
            <li>
              <a href="/">Acceder</a>
            </li>
          </NavbarSection>
        </Navbar>
        <Background>
          <ActionBox>
            <ActionGroup>
              <ActionTitle>Editor de algoritmos</ActionTitle>
              <ActionText>Aaaaaa Aaaaaa Aaaaaa Aaaaaa Aaaaaa </ActionText>
              <ActionButton>COMENZAR</ActionButton>
              <FunctionalityBox>
                <Functionality />
                <Functionality />
                <Functionality />
              </FunctionalityBox>
            </ActionGroup>
          </ActionBox>
          <CaptureBox>
            <Capture src="capture.png" alt="Choco Algorithm Capture" />
          </CaptureBox>
        </Background>
      </Container>
    </>
  )
}
