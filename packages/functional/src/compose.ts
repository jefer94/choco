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
export function compose<ReturnType, ParamType>(...functions: readonly Func[]):
  (t: ParamType) => ReturnType {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (arg: ParamType): ReturnType => functions.reduce<ReturnType>((value, fn) => fn(value), arg)
}

// // type a = readonly [string, number?]
// type Func<T, R> = (arg: T) => R

// /**
//  * Compose a function and pipe each return.
//  *
//  * @param  {...any} functions - Functions to be called from left to right.
//  * @example
//  * const add = (n) => n + n
//  * const square = (n) => n * n
//  * const cube = (n) => n * n * n
//  *
//  * compose(cube, square, add)(2) // returns 128
//  * @returns {compose~composed} - Composed function.
//  */
// export function compose<T0, T1, T2, T3, T4, T5, T6, T7>(...functions: readonly [Func<T0, T1>,
//   Func<T1, T2>?, Func<T2, T3>?, Func<T3, T4>?, Func<T4, T5>?, Func<T5, T6>?, Func<T6, T7>?]) {
//   // arguments
//   const a = (arg: T0) => functions.reduce((value, fn) => fn(value), arg)
//   return (arg: T0) => functions.reduce((value, fn) => fn(value), arg)
// }
