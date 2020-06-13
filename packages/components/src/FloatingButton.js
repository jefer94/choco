import React, { memo } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

/** @module components/FloatingButton */

const FloatingButtonStyled = styled(Button)`
  position: fixed;
  top: ${(v) => (v.vertical === 'top' ? '20px' : 'unset')};
  bottom: ${(v) => (v.vertical === 'bottom' ? '20px' : 'unset')};
  left: ${(v) => (v.horizontal === 'left' ? '20px' : 'unset')};
  right: ${(v) => (v.horizontal === 'right' ? '20px' : 'unset')};
  padding: 30px ${(v) => console.log(v.horizontal === 'right', v.vertical === 'bottom')};
  border-radius: 30px;
  background-color: #000;
  z-index: 255;
`

export default FloatingButtonStyled
