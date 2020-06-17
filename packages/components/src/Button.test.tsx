import React from 'react'
import 'jest-styled-components'
import renderer from 'react-test-renderer'
import { Button } from './Button'

test('it works', () => {
  [undefined, '#111', '#222', '#333'].forEach((color) => {
    const tree = renderer.create(<Button color={color} />).toJSON()
    expect(tree).toHaveStyleRule('border', `2px solid ${color || '#000'}`)
    expect(tree).toHaveStyleRule('margin', '0')
    expect(tree).toHaveStyleRule('padding', '10px')
    expect(tree).toHaveStyleRule('outline', '0')
    expect(tree).toHaveStyleRule('background-color', 'transparent')
  })
})