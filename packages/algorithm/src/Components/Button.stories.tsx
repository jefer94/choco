import React, { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from './Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default { title: 'Button' }

export const defaultButton = (): ReactElement => (
  <Button>Click</Button>
)

export const outlineButton = (): ReactElement => (
  <Button outline>Click</Button>
)
