import { begin, end, variables, type } from '../i18n'

/** @module libs/algorithm/variables */

/**
 * Transform Algorithm variables in Javascript variables.
 *
 * @param {string} code - Algorithm code.
 * @param {object} store - Store of variables.
 * @example
 * import variables from 'libs/algorithm/variables'
 *
 * const store = {}
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  stuff: string',
 *   'start'.
 *   '  ...'.
 *   'end'
 * ]
 * variables(code, store) // return 'var stuff;\n'
 * @returns {string} Javascript variables.
 */
export default function (code, store) {
  const literals = ignoreSentences(code)
  const [firstLine, ...lines] = literals.split('\n')
  const [keyword, ...restOfVarLine] = firstLine.split(' ')
  let result = ''
  if (isVarsZone(keyword, restOfVarLine)) Object.keys(lines).map(Number).forEach((key) => {
    const words = lines[key].split(' ')
    // const i = key + 1
    if (lines[key].search('//') !== -1) {
      const remove = lines[key].substr(lines[key].search('//'), lines[key].length)
      lines[key] = lines[key].replace(remove, '')
    }
    Object.keys(words).map(Number).forEach((j) => {
      if (j < words.length - 1) {
        const word = prepareWord(words[j])
        if (word) result += `var ${word};\n`
        if (j !== words.length - 1) reserveVars(store, words[words.length - 1],
          purgeVarName(words[j]))
      }
    })
  })
  return result.split('\n').filter((v) => v).join('\n')
}

/**
 * Is this line the beginning of the variable area?.
 *
 * @param {string} keyword - First word of line.
 * @param {string[]} restOfVarLine - Rest of words.
 * @example
 * // libs/i18n/variables = ['variables']
 * isVarsZone('variables', []) // return true
 * isVarsZone('variables', ['', '', '', '']) // return true
 * isVarsZone('Another', []) // return false
 * @see libs/i18n/variables
 * @returns {boolean} Is this line the beginning of the variable area?.
 */
function isVarsZone(keyword, restOfVarLine) {
  return variables.indexOf(keyword) !== -1 &&
    (!restOfVarLine.length || restOfVarLine.every((v) => !v))
}

/**
 * Purge variable name of tokens.
 *
 * @param {string} word - Algorithm variable with token.
 * @todo Understand purgeVarName('=') use.
 * @example
 * purgeVarName('=') // return ' = '
 * purgeVarName(' ') // return ''
 * purgeVarName('\t') // return ''
 * purgeVarName(',') // return ''
 * purgeVarName(':') // return ''
 * purgeVarName('array[10]') // return 'array'
 * @returns {string} Javascript variable without token.
 */
function purgeVarName(word) {
  return word
    .replace(/=/g, ' = ')
    .replace(/ /g, '')
    .replace(/\t/g, '')
    .replace(/,/g, '')
    .replace(/:/g, '')
    .replace(/\[[0-9]{1,9}\]/g, '')
}

/**
 * Transform in var section, Algorithm equal, assign type, extra spaces or tabs, separators and
 * vectors to Javascript.
 *
 * @param {string} word - A Algorithm word.
 * @example
 * prepareWord('=') // return ' = '
 * prepareWord(' ') // return ''
 * prepareWord('\t') // return ''
 * prepareWord(',') // return ''
 * prepareWord(':') // return ''
 * prepareWord('array[10]') // return 'array = new Vector(10)'
 * @returns {string} A Javacript word.
 */
function prepareWord(word) {
  return word
    .replace(/=/g, ' = ')
    .replace(/ /g, '')
    .replace(/\t/g, '')
    .replace(/,/g, '')
    .replace(/:/g, '')
    .replace(/\[/g, ' = new Vector(')
    .replace(/\]/g, ')')
}

/**
 * Reserve vars in the store.
 *
 * @param {object} store - Store of variables.
 * @param {string} isA - Variable type.
 * @param {string} word - Variable name.
 * @example
 * const store = {}
 * reserveVars(store, 'int', 'potato')
 * reserveVars(store, 'double', 'heyApple')
 * reserveVars(store, 'string', 'adc')
 * reserveVars(store, 'bool', 'mid')
 * // store {
 * //   potato: 'int',
 * //   heyApple: 'double',
 * //   adc: 'string',
 * //   mid: 'bool'
 * // }
 */
function reserveVars(store, isA, word) {
  switch (isA) {
    case type.int:
      store.varAdd('int', word)
      break
    case type.double:
      store.varAdd('double', word)
      break
    case type.string:
      store.varAdd('string', word)
      break
    case type.bool:
      store.varAdd('bool', word)
      break
    default:
  }
}

/**
 * Ignore algorithm body.
 *
 * @param {string} code - Algorithm code.
 * @example
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  easy: boolean',
 *   'start',
 *   '   ...',
 *   'end'
 * ].join('\n')
 * ignoreSentences(code) // return the same code but start ... end block
 * @returns {string} Get the code, less the body (start ... end).
 */
function ignoreSentences(code) {
  return code.replace(code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))[0], '')
}
