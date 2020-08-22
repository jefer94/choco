type Func = (...args: readonly unknown[]) => unknown

/**
 * Compose a function and pipe each return.
 *
 * @param functions - Functions to be called from left to right.
 * @example
 * ```
 * const add = (n) => n + n
 * const square = (n) => n * n
 * const cube = (n) => n * n * n
 *
 * compose(cube, square, add)(2) // returns 128
 * ```
 * @returns Composed function.
 */
export function compose<ReturnType, ParamType>(...functions: readonly Func[]):
  (t: ParamType) => ReturnType {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (arg: ParamType): ReturnType => functions.reduce<ReturnType>((value, fn) => fn(value), arg)
}
