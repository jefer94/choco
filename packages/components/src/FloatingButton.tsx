import React, { memo } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

/** @module components/FloatingButton */
type FloatingButtonProps = {
  readonly vertical: string
  readonly horizontal: string
}

export const FloatingButton = styled(Button)`
  position: fixed;
  top: ${(v: FloatingButtonProps) => (v.vertical === 'top' ? '20px' : 'unset')};
  bottom: ${(v: FloatingButtonProps) => (v.vertical === 'bottom' ? '20px' : 'unset')};
  left: ${(v: FloatingButtonProps) => (v.horizontal === 'left' ? '20px' : 'unset')};
  right: ${(v: FloatingButtonProps) => (v.horizontal === 'right' ? '20px' : 'unset')};
  border-radius: 30px;
  background-color: #000;
  z-index: 255;
`
