/**
 * Remove comments from line(s)
 * @param {string|string[]} code - Line(s) to be replaced
 * @example
 * import removeComments from '@choco/algorithm-transpiler'
 *
 * removeComments('hi //') // returns 'hi'
 * removeComments(['hi //', 'apple //']) // returns ['hi', 'apple']
 * @returns {string|string[]} Line(s) without comments
 */
export default function comments(code) {
  const regexp = /( ?\/\/.*$)/gm
  return code instanceof Array ?
    code.map(v => v.replace(regexp, '')) :
    code.replace(regexp, '')
}