import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from './Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default { title: 'Button' }

export const defaultButton = () => (
  <Button>Click</Button>
)

export const outlineButton = () => (
  <Button outline>Click</Button>
)
