import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
// import { faBars } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import keychain from '@chocolab/keychain'
import { MenuItem } from './MenuItem'
// import { StyledMenu } from './types'

// import './Menu.sass'

const MenuWrapper = styled.div`
  transition-duration: 0.1s;
  width: 64px;
  height: 100vh;
  display: inline-block;
  position: absolute;
  /* background-color: ${(v) => v.theme.surface}; */
  border-right: 1px solid ${(v) => v.theme.surfaceBorder};
  box-shadow: 1px 0 ${(v) => v.theme.surfaceBorder};
  background: #252526;
  content: " ";
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`

const ContentWrapper = styled.div`
  top: 0px;
  left: 64px;
  width: calc(100vw - 64px);
  position: absolute;
  display: inline-block;
  height: 100vh;
  overflow: hidden;
`

const BottomItems = styled.ul`
  bottom: 0;
  position: absolute;
`

export type MenuItemProps = {
  readonly id: string
  readonly url: string
  readonly icon: IconDefinition
  readonly active: boolean
}

/**
 * Menu item config.
 * @param url - Menu url.
 * @param icon - Menu url.
 * @param active - Menu url.
 * @returns Menu item props.
 */
export function menuItem(url: string, icon: IconDefinition, active?: boolean): MenuItemProps {
  return { id: keychain('menu'), url, icon, active }
}

type MenuProps = {
  readonly theme: Record<string, string>
  readonly children: ReactNode
  readonly topItems: readonly MenuItemProps[]
  readonly bottomItems: readonly MenuItemProps[]
}

/**
 * App Menu.
 * @param props - Link props.
 * @returns Menu element.
 */
export function Menu({ theme, children, topItems, bottomItems }: MenuProps): ReactElement {
  return (
    <>
      <MenuWrapper theme={theme}>
        {topItems.length ? (
          <ul>
            {/* <MenuItem icon={faBars} active theme={theme} onClick={() => toggle()} /> */}
            {topItems.map(({ id, url, icon, active }) => (
              <MenuItem key={id} url={url} icon={icon} active={!!active} theme={theme} />
            ))}
          </ul>
        ) : <></>}
        {bottomItems.length ? (
          <BottomItems>
            {/* <MenuItem icon={faBars} active theme={theme} onClick={() => toggle()} /> */}
            {bottomItems.map(({ id, url, icon, active }) => (
              <MenuItem key={id} url={url} icon={icon} active={!!active} theme={theme} />
            ))}
          </BottomItems>
        ) : <></>}
      </MenuWrapper>
      <ContentWrapper theme={theme}>
        {children}
      </ContentWrapper>
    </>
  )
}
