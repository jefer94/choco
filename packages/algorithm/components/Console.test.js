import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Icon from './Icon'
import Console from './Console'
import keychain from '../libs/keychain'

// remove svg icon
jest.mock('./Icon')
Icon.type.mockReturnValue(<></>)

function item(content, variable) {
  return { id: keychain('tab'), var: variable, content }
}

test('fisrt line class', () => {
  const firstLineClass = 'console-prefix CodeMirror-linenumber CodeMirror-gutter-elf arrow'
  const lines = [
    item('first line'),
    item('other line')
  ]
  const { container } = render(<Console lines={lines} />)
  const [firstLine, secondLine, ...restOfLines] = container.querySelectorAll('.lines')
  expect(restOfLines).toHaveLength(0)
  expect(firstLine).toBeTruthy()
  expect(secondLine).toBeTruthy()

  firstLineClass.split(' ').map((v) => {
    const firstElement = firstLine.querySelector('.' + v)
    const secondElement = secondLine.querySelector('.' + v)
    expect(firstElement).toBeTruthy()
    expect(secondElement).toBeNull()
  })
})

test('content is right', () => {
  const lines = [
    item('line1'),
    item('line2')
  ]
  const { getAllByText } = render(<Console lines={lines} />)
  Object.values([1, 2]).map((v) => {
    const [line, ...restOfLines] = getAllByText('line' + v)
    expect(restOfLines).toHaveLength(0)
    expect(line).toBeTruthy()
  })
})

test('var section is right', () => {
  const lines = [
    item('line1', '1'),
    item('line2', '2')
  ]
  
  const { container } = render(<Console lines={lines} />)

  const [line1, line2, ...restOfLines] = container.querySelectorAll('.var')
  expect(restOfLines).toHaveLength(0)
  expect(line1).toBeTruthy()
  expect(line2).toBeTruthy()
})

test('var section is empty', () => {
  const lines = [
    item('line1'),
    item('line2')
  ]

  const { container } = render(<Console lines={lines} />)

  const linesWithoutSize = container.querySelectorAll('.var')
  expect(linesWithoutSize).toHaveLength(0)
})

test('without content', () => {
  const lines = [
    item(),
    item()
  ]

  const { container } = render(<Console lines={lines} />)

  const [line1, line2, ...restOfLines] = container.querySelectorAll('.margin-line ')
  expect(restOfLines).toHaveLength(0)
  expect(line1.children).toHaveLength(0)
  expect(line2.children).toHaveLength(0)
})