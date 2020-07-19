import React, { ReactElement } from 'react'
import styled, { StyledFunction } from 'styled-components' // eslint-disable-line
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Dictionary } from '@choco/types'
import { Link } from './Link'
import { Icon } from './Icon'

const BaseStyled = `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 7px 0px;
  line-height: 21px;
  font-size: 16px;
  color: #D7DAE0;
`

/**
 * @typedef {object} MenuLinkProps
 * @property {string} id - Menu id.
 * @property {string} url - Menu url.
 * @property {object} icon - Menu icon.
 * @property {boolean} active - Menu active.
 */

export type MenuLinkProps = {
  readonly className?: string
  readonly theme: Record<string, string>
  readonly url?: string
  readonly icon: IconDefinition
}

/**
 * Menu link element.
 *
 * @param {MenuLinkProps} props - Menu link props.
 * @returns {object} Menu link.
 */
function MenuLink({ className, theme, url, icon }: MenuLinkProps): ReactElement {
  return (
    <div className={className}>
      <Link to={url}>
        <Icon name={icon} theme={theme} />
      </Link>
    </div>
  )
}

type ActiveProp = {
  readonly active: boolean
}

// const b = styled<ActiveProp & React.HTMLProps<HTMLInputElement>>(MenuLink)
// const b = styled<ActiveProp & React.HTMLProps<HTMLInputElement>>(MenuLink)

const MenuLinkStyled = styled(MenuLink)`
  ${BaseStyled}
  filter: ${(v: ActiveProp) => (v.active ? 'brightness(150%)' : 'unset')};
`

/**
 * @typedef {object} MenuItemProps
 * @property {}
 */

type MenuItemProps = {
  readonly className?: string
  readonly theme: Record<string, string>
  readonly url?: string
  readonly icon: IconDefinition
  readonly active: boolean
  readonly onClick?: () => void
}

/**
 * Menu item component.
 *
 * @param  Props - Props.
 * @returns {object} Menu item component.
 */
function MenuItemBase({ className, theme, url = '#', icon, active, onClick }: MenuItemProps): ReactElement {
  console.log('click', onClick)
  return (
    <li className={className} onClick={onClick}>
      <MenuLinkStyled url={url} icon={icon} active={active} theme={theme} />
    </li>
  )
}

// type ActiveProp = {
//   readonly active: boolean
// }

// export default styled<MenuItemProps & ActiveProp>(MenuItem)`
export const MenuItem = styled(MenuItemBase)`
  ${BaseStyled}
  filter: ${(v: ActiveProp) => (v.active ? 'brightness(150%)' : 'unset')};
`
