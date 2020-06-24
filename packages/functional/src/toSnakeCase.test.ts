import { toSnakeCase } from './toSnakeCase'

test('return object', () => {
  expect(toSnakeCase('pokemonPotato')).toEqual('pokemon_potato')
})
