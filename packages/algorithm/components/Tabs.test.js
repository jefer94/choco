import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Icon from './Icon'
import Tabs from './Tabs'
import keychain from '../libs/keychain'

// remove svg icon
jest.mock('./Icon')
Icon.type.mockReturnValue(<></>)

function item(name, content, active) {
  return { id: keychain('tab'), name, content, active }
}

test('without multitabs feature prop', () => {
  const tabs = [
    item('Tab1', 'Content1', true)
  ]
  const { getAllByText } = render(<Tabs tabs={tabs} multiTabsFeature={false} />)
  expect(getAllByText('Tab1').length).toBe(1)
})


test('undefined multitabs feature prop', () => {
  const tabs = [
    item('Tab1', 'Content1', true)
  ]
  const { getAllByText } = render(<Tabs tabs={tabs} />)
  expect(getAllByText('Tab1').length).toBe(1)
})

test('with multitabs feature prop', () => {
  const addFunc = jest.fn()
  const changeFunc = jest.fn()
  const removeFunc = jest.fn()

  const tabs = [
    item('Tab1', 'Content1', true),
    item('Tab2', 'Content1', true),
    item('Tab3', 'Content1', true),
    item('Tab4', 'Content1', true),
    item('Tab5', 'Content1', true)
  ]
  const { getAllByText, container } = render(<Tabs
    tabs={tabs}
    add={addFunc}
    remove={removeFunc}
    change={changeFunc}
    multiTabsFeature={true}
  />)

  expect(addFunc.mock.calls.length).toBe(0)
  expect(changeFunc.mock.calls.length).toBe(0)
  expect(removeFunc.mock.calls.length).toBe(0)

  for (let i = 1; i < 6; i++) {
    const [element, ...restOfElements] = getAllByText('Tab' + i)
    expect(restOfElements.length).toBe(0)
    fireEvent.click(element)
  }

  expect(changeFunc.mock.calls.length).toBe(5)
  expect(removeFunc.mock.calls.length).toBe(0)

  for (let i = 1; i < 6; i++) {
    const [element, ...restOfElements] = container.querySelectorAll(`[aria-label="Remove tab: Tab${i}"]`)
    expect(restOfElements.length).toBe(0)
    fireEvent.click(element)
  }

  expect(removeFunc.mock.calls.length).toBe(5)

  expect(addFunc.mock.calls.length).toBe(0)

  const [addElement, ...restOfAddElements] = container.querySelectorAll('[aria-label="Add tab"]')
    expect(restOfAddElements.length).toBe(0)
  for (let i = 1; i < 6; i++) {
    fireEvent.click(addElement)
    expect(addFunc.mock.calls.length).toBe(i)
  }
})

test('active prop with correct class', () => {
  const tabs = [
    item('Tab1', 'Content1', true)
  ]
  const { container } = render(<Tabs tabs={tabs} />)
  const [activeElement, ...restOfActiveElements] = container.querySelectorAll('.tab-active')
  expect(restOfActiveElements.length).toBe(0)

  expect(activeElement).toBeTruthy()

  const inactiveElements = container.querySelectorAll('.tab')
  expect(inactiveElements.length).toBe(0)
})

test('inactive prop with correct class', () => {
  const tabs = [
    item('Tab1', 'Content1', false)
  ]
  const { container } = render(<Tabs tabs={tabs} />)
  const [inactiveElement, ...restOfInactiveElements] = container.querySelectorAll('.tab')
  expect(restOfInactiveElements.length).toBe(0)

  expect(inactiveElement).toBeTruthy()

  const activeElements = container.querySelectorAll('.tab-active')
  expect(activeElements.length).toBe(0)
})

test('undefined prop with correct class', () => {
  const tabs = [
    item('Tab1', 'Content1')
  ]
  const { container } = render(<Tabs tabs={tabs} />)
  const [inactiveElement, ...restOfInactiveElements] = container.querySelectorAll('.tab')
  expect(restOfInactiveElements.length).toBe(0)

  expect(inactiveElement).toBeTruthy()

  const activeElements = container.querySelectorAll('.tab-active')
  expect(activeElements.length).toBe(0)
})

