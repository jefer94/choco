import { filterObject } from './filterObject'

test('filterObject returns correct value', () => {
  const game = {
    top: 'Jax',
    jg: 'Camille',
    mid: 'Kassadin',
    adc: 'Jhin',
    support: 'Bard'
  }
  const { adc, support, ...restOfProperties } = filterObject(game, ['adc', 'support'])
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(adc).toBe('Jhin')
  expect(support).toBe('Bard')
})
