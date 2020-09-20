import React, { ReactElement } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import { background } from 'styled-system'
// import './Loading.sass'
import styled from 'styled-components'

type Props = {
  readonly className: string
  readonly color: string | undefined
}

/**
 * Loading spinner component.
 * @example
 * ```
 * <Loading />
 * ```
 * @returns Loading spinner component.
 */
function LoadingBase({ className, color }: Props): ReactElement {
  return (
    <div className={className}>
      <PulseLoader color={color} loading />
    </div>
  )
}

export const Loading = styled(LoadingBase)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  ${background}
`
