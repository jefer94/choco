import { capitalizeFirstLetter } from './capitalizeFirstLetter'

test('starting with uppercase', () => {
  const name = 'Lacey'
  expect(capitalizeFirstLetter(name)).toBe('Lacey')
})

test('starting with lowercase', () => {
  const name = 'lacey'
  expect(capitalizeFirstLetter(name)).toBe('Lacey')
})
