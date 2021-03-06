import React, { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Loading } from './Loading'

export default { title: 'Loading' }

export const defaultLoading = (): ReactElement => (
  <Loading />
)
