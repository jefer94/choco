import React, { ReactElement } from 'react'
import styled, { StyledFunction } from 'styled-components' // eslint-disable-line
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Link } from './Link'
import { Icon } from './Icon'
import theme from './theme'

const BaseStyled = `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  color: ${theme.white};
`

export type MenuIconProps = {
  readonly className?: string
  readonly theme: Record<string, string>
  readonly icon: IconDefinition
}

/**
 * Menu link element.
 *
 * @param props - Menu link props.
 * @returns Menu link.
 */
function MenuIcon({ className, theme, icon }: MenuIconProps): ReactElement {
  return (
    <div className={className}>
      <Icon name={icon} theme={theme} width="24px!important" height={24} />
    </div>
  )
}

type ActiveProp = {
  readonly active: boolean
}

// const b = styled<ActiveProp & React.HTMLProps<HTMLInputElement>>(MenuLink)
// const b = styled<ActiveProp & React.HTMLProps<HTMLInputElement>>(MenuLink)

const MenuIconStyled = styled(MenuIcon)`
  ${BaseStyled}
  filter: ${(v: ActiveProp) => (v.active ? 'brightness(150%)' : 'unset')};
`

type MenuItemProps = {
  readonly className?: string
  readonly theme: Record<string, string>
  readonly url?: string
  readonly icon: IconDefinition
  readonly active: boolean
}

/**
 * Menu item component.
 *
 * @param Props - Props.
 * @returns Menu item component.
 */
function MenuItemBase({ className, theme, url = '#', icon, active }: MenuItemProps): ReactElement {
  const base = (
    <li className={className}>
      <MenuIconStyled icon={icon} active={active} theme={theme} />
    </li>
  )
  if (active) return base
  return (
    <Link to={url}>
      {base}
    </Link>
  )
}

// type ActiveProp = {
//   readonly active: boolean
// }

// export default styled<MenuItemProps & ActiveProp>(MenuItem)`
export const MenuItem = styled(MenuItemBase)`
  ${BaseStyled}
  box-sizing: border-box;
  border-left: ${(v: ActiveProp) => (v.active ? '3px' : 0)} solid ${theme.white};
  filter: ${(v: ActiveProp) => (v.active ? 'brightness(150%)' : 'unset')};
`
