import { compose } from './compose'

test('compose returns correct value', () => {
  expect(compose(cube, square, add)(2)).toBe(128)
})

function add(n) {
  return n + n
}

function square(n) {
  return n * n
}

function cube(n) {
  return n * n * n
}
