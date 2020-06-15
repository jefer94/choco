import { memo } from './memo'

test('return potato.io', () => {
  const host = 'potato.io'
  expect(memo('potato host', host)).toBe(host)
  expect(memo('potato host')).toBe(host)
})

test('return object', () => {
  const pokemon = {
    edition: 'potato'
  }

  expect(memo('pokemon object', pokemon)).toEqual(pokemon)
  expect(memo('pokemon object')).toEqual(pokemon)
})

test('return object', () => {
  const trueAdcs = ['yasuo', 'syndra', 'cassiopedia']

  expect(memo('true adcs', trueAdcs)).toEqual(trueAdcs)
  expect(memo('true adcs')).toEqual(trueAdcs)
})
