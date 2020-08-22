import locale from '@choco/i18n'

/**
 * Diff between Algorithm code and Javascript code.
 *
 * @param code - Algorithm code.
 * @param js - Current Javascript code.
 * @example
 * ```
 * const alg = [
 *   'variables',
 *   '  bestAdc: string'
 * ].join('\n')
 * const js = 'var bestAdc'
 * diff(alg, js) // return 1
 * ```
 * @returns Diff between codes.
 */
export default function diff(code: string, js: string): number {
  const begin = locale.one<string>('begin')
  const alg = code
    .split(/\n/)
  let beginIndex = 1
  while (alg[beginIndex] && alg[beginIndex].match(RegExp(begin)) === null) beginIndex += 1
  beginIndex += 1

  const localJS = js
    .split(/\n/)
  let jsIndex = 0
  while (/var/.test(localJS[jsIndex])) jsIndex++

  return beginIndex - jsIndex
}
