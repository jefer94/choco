import React, { ReactElement, ReactChildren } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components' // eslint-disable-line
import { Dictionary } from '@choco/types'

export const TabButtonStyled = styled.button`
  color: ${(v) => v.theme.white};
  background-color: unset;
  outline: 0;
  margin: 0;
  border: 0;
`

/**
 * @callback TabButtonClick
 */

/**
 * @typedef {object} TabButtonProps
 * @property {object} theme - Tab button theme.
 * @property {string} label - Tab button label.
 * @property {TabButtonClick} click - Tab button click.
 * @property {object} children - Tab button children.
 * @property {string} className - Tab button className.
 */

type TabButtonProps = {
  readonly theme: Dictionary
  readonly label: string
  readonly click: () => void
  readonly children: ReactChildren
  readonly className: string
}

/**
 * Tab button element.
 *
 * @param {TabButtonProps} props - Tab button props.
 * @returns {object} Tab button element.
 */
function TabButton({ theme, label, click, children, className }: TabButtonProps): ReactElement {
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
