import React, { memo, ReactElement } from 'react'
import PropTypes from 'prop-types'
import PulseLoader from 'react-spinners/PulseLoader'
// import './Loading.sass'
import styled from 'styled-components'

/** @module components/Loading */

type Props = {
  readonly className: string
  readonly color: string | undefined
}

/**
 * Loading spinner component.
 *
 * @example
 * <Loading />
 * @returns {object} <Loading />
 */
function LoadingBase({ className, color }: Props): ReactElement {
  return (
    <div className={className}>
      <PulseLoader color={color} loading />
    </div>
  )
}
LoadingBase.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string
}

export const Loading = styled(LoadingBase)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(v) => v.background}
`
