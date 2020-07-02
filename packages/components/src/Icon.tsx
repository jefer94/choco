import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
// import './Icon.sass'
import styled from 'styled-components'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from './FontAwesomeWrapper'

/** @module components/Icon */

/**
 * @typedef {object} IconProps
 * @property {string} className - CSS class.
 * @property {string} name - Icon from FontAwesome.
 */

type IconProps = {
  readonly className: string
  readonly name: IconProp
  readonly theme?: Record<string, string>
}
/**
 * Edidor wrapper.
 *
 * @param {IconProps} props - Icon props.
 * @example
 * <Icon name={FontAwesomeIcon} />
 * @returns {object} <Icon ... />.
 */
function Icon({ className, name }: IconProps): ReactElement {
  return <FontAwesomeIcon className={className} icon={name} />
}

export default styled(Icon)`color: ${(v) => v.theme.white};`
