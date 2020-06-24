/** @module @choco/functional */

type Func = (...args: readonly unknown[]) => unknown

/**
 * Compose a function and pipe each return.
 *
 * @param  {...any} functions - Functions to be called from left to right.
 * @example
 * const add = (n) => n + n
 * const square = (n) => n * n
 * const cube = (n) => n * n * n
 *
 * compose(cube, square, add)(2) // returns 128
 * @returns {compose~composed} - Composed function.
 */
export function compose(...functions: readonly Func[]) {
  return (arg: unknown): unknown => functions.reduce((value, fn) => fn(value), arg)
}
