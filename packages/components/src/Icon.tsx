import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
// import './Icon.sass'
import styled from 'styled-components'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from './FontAwesomeWrapper'

/** @module components/Icon */

/**
 * @typedef {object} IconProps
 * @property {string} name - Icon from FontAwesome.
 */

type Props = {
  readonly className: string
  readonly name: IconProp
}
/**
 * Edidor wrapper.
 *
 * @param {IconProps} props - Icon props.
 * @example
 * <Icon name={FontAwesomeIcon} />
 * @returns {object} <Icon ... />.
 */
function Icon({ className, name }: Props): ReactElement {
  return <FontAwesomeIcon className={className} icon={name} />
}
Icon.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
}

export default styled(Icon)`color: ${(v) => v.theme.white};`
