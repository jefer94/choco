import React, { memo } from 'react'
import PropTypes from 'prop-types'
import PulseLoader from 'react-spinners/PulseLoader'
// import './Loading.sass'
import styled from 'styled-components'

/** @module components/Loading */

/**
 * Loading spinner component.
 *
 * @example
 * <Loading />
 * @returns {object} <Loading />
 */
function Loading({ className, color }) {
  return (
    <div className={className}>
      <PulseLoader color={color} loading />
    </div>
  )
}
Loading.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

const LoadingStyled = styled(Loading)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(v) => v.background}
`

export default LoadingStyled
