import React from 'react'
import PropTypes from 'prop-types'
// import './Icon.sass'
import styled from 'styled-components'
import FontAwesomeIcon from './FontAwesomeWrapper'

/** @module components/Icon */

/**
 * @typedef {object} IconProps
 * @property {string} name - Icon from FontAwesome
 */

/**
 * Edidor wrapper
 * @param {IconProps} props
 * @example
 * <Icon name={FontAwesomeIcon} />
 * @returns {object} <Editor ... />
 */
function Icon({ className, name }) {
  return <FontAwesomeIcon className={className} icon={name} />
}
Icon.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
}

export default styled(Icon)`color: ${(v) => v.theme.white};`
