import locale from '@choco/i18n'

/** @module @choco/algorithm-transpiler/diff */

/**
 * Diff between Algorithm code and Javascript code.
 *
 * @param {*} code - Algorithm code.
 * @param {*} js - Current Javascript code.
 * @todo support diff of vars lines
 * @example
 * const alg = [
 *   'variables',
 *   '  bestAdc: string'
 * ].join('\n')
 * const js = 'var bestAdc'
 * diff(alg, js) // return 1
 * @returns {number} Diff between codes.
 */
export default function (code, js) {
  const { begin } = locale.all()
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
