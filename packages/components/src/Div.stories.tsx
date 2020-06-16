import React, { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Div } from './Div'
import 'bootstrap/dist/css/bootstrap.min.css'

export default { title: 'Div' }

export const defaultDiv = (): ReactElement => (
  <Div>Text</Div>
)

export const divWithRedColor = (): ReactElement => (
  <Div color="#f00">Text</Div>
)

export const divWithRedBackdround = (): ReactElement => (
  <Div bg="#f00">Text</Div>
)
