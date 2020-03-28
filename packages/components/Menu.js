import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MenuItem from './MenuItem'
// import './Menu.sass'

/** @module components/Menu */

const MenuWrapper = styled.div`
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
  left: 64px;
  width: calc(100vw - 64px);
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
function Menu({ theme, children, items }) {
  // function Menu({ theme, children, items, isOpen, toggle }) {
  return (
    <>
      <MenuWrapper theme={theme}>
        <ul>
          {items.map(({ id, url, icon, name, active }) => (
            <MenuItem key={id} url={url} icon={icon} name={name} active={!!active} theme={theme} />
          ))}
        </ul>
      </MenuWrapper>
      <ContentWrapper theme={theme}>
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

export default memo(Menu)
