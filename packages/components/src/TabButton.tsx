import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components' // eslint-disable-line

export const TabButtonStyled = styled.button`
  color: ${(v) => v.theme.white};
  background-color: unset;
  outline: 0;
  margin: 0;
  border: 0;
`

type TabButtonProps = {
  readonly theme: Record<string, string>
  readonly label: string
  readonly click?: () => void
  readonly children: ReactNode // | string
  readonly className?: string
}

/**
 * Tab button element.
 * @param props - Tab button props.
 * @returns Tab button element.
 */
export function TabButton({ theme, label, click, children, className }: TabButtonProps):
  ReactElement {
  return (
    <TabButtonStyled type="button" aria-label={label} onClick={click} className={className} theme={theme}>
      {children}
    </TabButtonStyled>
  )
}
