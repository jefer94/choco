/**
 * Remove comments from line(s).
 *
 * @param code - Line(s) to be replaced.
 * @example
 * ```
 * import removeComments from '@choco/algorithm-transpiler'
 *
 * removeComments('hi //') // returns 'hi'
 * removeComments(['hi //', 'apple //']) // returns ['hi', 'apple']
 * ```
 * @returns Line(s) without comments.
 */
export default function comments(code: string | readonly string[]): string | readonly string[] {
  const regexp = /( ?\/\/.*$)/gm
  if (typeof code === 'string') return code.replace(regexp, '')
  return code.map((v) => v.replace(regexp, ''))
}
