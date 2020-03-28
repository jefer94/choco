import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' // eslint-disable-line

export const TabButtonStyled = styled.button`
  color: ${(v) => v.theme.white};
  background-color: unset;
  outline: 0;
  margin: 0;
  border: 0;
`

function TabButton({ theme, label, click, children, className }) {
  return (
    <TabButtonStyled type="button" aria-label={label} onClick={click} className={className} theme={theme}>
      {children}
    </TabButtonStyled>
  )
}
TabButton.propTypes = {
  theme: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  click: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
TabButton.defaultProps = {
  // children: [],
  click: () => {},
  className: ''
}

export default TabButton
