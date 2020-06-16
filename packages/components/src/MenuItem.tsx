import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import styled from 'styled-components' // eslint-disable-line
import Icon from './Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Dictionary } from '@choco/types'

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
 * @typedef {object} MenuItemProps
 * @property {string} id - Menu id.
 * @property {string} url - Menu url.
 * @property {object} icon - Menu icon.
 * @property {boolean} active - Menu active.
 */

export type Props = {
  readonly className: string
  readonly theme: Dictionary
  readonly url: string
  readonly icon: IconProp
}

/**
 * Menu link element.
 *
 * @param {MenuItemProps} props - Menu link props.
 * @returns {object} Menu link.
 */
function MenuLink({ className, theme, url, icon }: Props): ReactElement {
  console.log(icon, 'icon')
  return (
    <div className={className}>
      <Link to={url}>
        <Icon name={icon} theme={theme} />
      </Link>
    </div>
  )
}
MenuLink.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
}

const MenuLinkStyled = styled(MenuLink)`
  ${BaseStyled}
  filter: ${(v) => (v.active ? 'brightness(150%)' : 'unset')};
`

function MenuItem({ className, theme, url, icon, active, onClick }) {
  console.log('click', onClick)
  return (
    <li className={className} onClick={onClick}>
      <MenuLinkStyled url={url} icon={icon} active={active} theme={theme} />
    </li>
  )
}
MenuItem.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string,
  icon: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired,
  active: PropTypes.bool.isRequired
}
MenuItem.defaultProps = {
  url: '#'
}

export default styled(MenuItem)`
  ${BaseStyled}
  filter: ${(v) => (v.active ? 'brightness(150%)' : 'unset')};
`
