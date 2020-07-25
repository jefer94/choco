import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { Div } from './Div'

test('Div', () => {
  const { findAllByText } = render(<Div>Text</Div>)
  expect(findAllByText(/Text/)).toBeTruthy()
})

test('Div color', () => {
  const tree = renderer.create(<Div color="#123" />).toJSON()
  expect(tree).toHaveStyleRule('color', '#123')
})

test('Div bg', () => {
  const tree = renderer.create(<Div bg="#123" />).toJSON()
  expect(tree).toHaveStyleRule('background-color', '#123')
})
