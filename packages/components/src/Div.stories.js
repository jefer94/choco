import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Div } from './Div'
import 'bootstrap/dist/css/bootstrap.min.css'

export default { title: 'Div' }

export const defaultDiv = () => (
  <Div>Text</Div>
)

export const divWithRedColor = () => (
  <Div color="#f00">Text</Div>
)

export const divWithRedBackdround = () => (
  <Div bg="#f00">Text</Div>
)
