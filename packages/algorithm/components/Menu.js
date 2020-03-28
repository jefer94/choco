import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MenuItem from './MenuItem'
import { faBars } from '@fortawesome/free-solid-svg-icons'

// import './Menu.sass'

/** @module components/Menu */

const MenuWrapper = styled.div`
  transform: ${(v) => v.show ? 'unset' : 'translateX(-64px)'};
  transition-duration: 0.1s;
  width: 64px;
  height: 100vh;
  display: inline-block;
  position: absolute;
  background-color: ${(v) => v.theme.surface};
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
  left: ${(v) => v.menuIsOpen ? '64px' : 'unset'};
  width: ${(v) => v.menuIsOpen ? 'calc(100vw - 64px)' : '100vw'};
  position: absolute;
  display: inline-block;
  height: 100vh;
  overflow: hidden;
`

/**
 * App Menu.
 *
 * @param {object} children - Children of menu.
 * @todo Color of tabs menu
 * @todo Hide menu when click an icon
 */
function Menu({ theme, children, items, isOpen, toggle }) {
  return (
    <>
      <MenuWrapper theme={theme} show={isOpen}>
        <ul>
          <MenuItem icon={faBars} active theme={theme} onClick={(v) => toggle()} />
          {items.map(({ id, url, icon, active }) => (
            <MenuItem key={id} url={url} icon={icon} active={!!active} theme={theme} />
          ))}
        </ul>
      </MenuWrapper>
      <ContentWrapper theme={theme} menuIsOpen={isOpen}>
        {children}
      </ContentWrapper>
    </>
  )
}
const menuShape = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
}
Menu.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(menuShape)).isRequired
}

export default Menu
