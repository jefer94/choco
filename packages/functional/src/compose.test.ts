import { compose } from './compose'

test('compose returns correct value', () => {
  expect(compose(cube, square, add)(2)).toBe(128)
})

/**
 * Add.
 * @param n - Number.
 * @example
 * ```
 * add(1, 2) // returns 3
 * ```
 * @returns Numbers addeds.
 */
function add(n): number {
  return n + n
}

/**
 * Square.
 * @param n - Number.
 * @example
 * square(3) // returns 9
 * @returns Result of n * n.
 */
function square(n): number {
  return n * n
}

/**
 * Cube.
 * @param n - Number.
 * @example
 * square(3) // returns 27
 * @returns Result of n * n * n.
 */
function cube(n): number {
  return n * n * n
}
