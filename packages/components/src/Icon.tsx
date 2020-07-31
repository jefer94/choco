import React, { ReactElement } from 'react'
// import './Icon.sass'
import styled from 'styled-components'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { layout } from 'styled-system'
import FontAwesomeIcon from './FontAwesomeWrapper'

/** @module components/Icon */

/**
 * @typedef {object} IconProps
 * @property {string} className - CSS class.
 * @property {string} name - Icon from FontAwesome.
 */

type IconProps = {
  readonly className?: string
  readonly name: IconDefinition
  // readonly theme?: Record<string, string>
}
/**
 * Edidor wrapper.
 *
 * @param {IconProps} props - Icon props.
 * @example
 * <Icon name={FontAwesomeIcon} />
 * @returns {object} <Icon ... />.
 */
function IconBase({ className, name }: IconProps): ReactElement {
  return <FontAwesomeIcon className={className} icon={name} />
}

type IconStyleProps = {
  readonly width: number | string
  readonly theme: Record<string, string>
}

export const Icon = styled(IconBase)`
  color: ${(v: IconStyleProps) => v.theme.white};
  ${layout}
`
