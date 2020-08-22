import styled from 'styled-components'
import { Button } from './Button'
import theme from './theme'

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
  border-radius: 32px;
  border: 0;
  width: 64px;
  height: 64px;
  background-color: ${theme.blue};
  z-index: 255;
`
