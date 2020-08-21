import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  /* background: #000; */
  margin: 16px;
  ul {
    list-style: none;
    text-align: right;
    li {
      margin: 0 7px;
      display: inline;
      font-size: 18px;
      border-bottom: 1px solid #3880ff;
      transition-duration: .1s;
      &:hover {
        border-bottom: 2px solid #3171e0;
      }
    }
  }

`

const Home = (): ReactElement => (
  <Nav>
    <ul>
      <li>Home</li>
      <li>Register</li>
    </ul>
  </Nav>
)

export default Home
