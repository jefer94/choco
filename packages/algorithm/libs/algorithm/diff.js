import locale from '@choco/i18n'

const { begin } = locale.all()

/** @module @choco/algorithm-transpiler/diff */

/**
 * Diff between Algorithm code and Javascript code.
 *
 * @param {*} code - Algorithm code.
 * @param {*} js - Current Javascript code.
 * @example
 * alg = [
 *   'variables',
 *   '  bestAdc: string'
 * ].join('\n')
 * js = 'var bestAdc'
 * diff(alg, js) // return 1
 * @returns {number} Diff between codes
 */
export default function (code, js) {
  const alg = code
    .split(/\n/)
  let beginIndex = 1
  while (alg[beginIndex].match(RegExp(begin)) === null) beginIndex++

  beginIndex++

  const localJS = js
    .split(/\n/)
  let jsIndex = 0
  while (/var/.test(localJS[jsIndex])) jsIndex++

  return beginIndex - jsIndex
}
