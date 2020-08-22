import { compose } from '@choco/functional'
import locale from '@choco/i18n'
import comments from './comments'
import removeSpaces from './spaces'
import { LangType, LangTypeError, LangError, LangVariables } from './lang/common'

export type VariableStore = {
  readonly varAdd: (value: string, name: string) => void
  readonly varReset: () => void
}

/**
 * Transform Algorithm variables in Javascript variables.
 *
 * @param code - Algorithm code.
 * @param store - Store of variables.
 * @example
 * ```
 * import variables from 'libs/algorithm/variables'
 *
 * const store = {}
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  stuff: string',
 *   'start',
 *   '  ...',
 *   'end'
 * ]
 * variables(code, store) // return 'var stuff;\n'
 * ```
 * @returns Javascript variables.
 */
export default function variables(code: string, store?: VariableStore): string {
  const [firstLine, ...lines] = compose<string, string>(comments, removeSpaces, ignoreSentences)(code).split('\n')
  const [keyword, ...restOfVarLine] = firstLine.split(' ')
  let result = ''

  if (isVarsZone(keyword, restOfVarLine)) {
    Object.keys(lines).map(Number).forEach((key) => {
      const words = lines[key].split(' ').filter((v) => v)

      Object.keys(words).map(Number).forEach((j) => {
        if (j < words.length - 1) {
          const word = prepareWord(words[j])
          result += `var ${word};\n`
          reserveVars(store, words[words.length - 1], purgeVarName(words[j]))
        }
      })
    })
  }
  return result.split('\n').filter((v) => v).join('\n')
}

/**
 * Is this line the beginning of the variable area?.
 *
 * @param keyword - First word of line.
 * @param restOfVarLine - Rest of words.
 * @example
 * ```
 * // libs/i18n/variables = ['variables']
 * isVarsZone('variables', []) // return true
 * isVarsZone('variables', ['', '', '', '']) // return true
 * isVarsZone('Another', []) // return false
 * ```
 * @returns Is this line the beginning of the variable area?.
 */
function isVarsZone(keyword: string, restOfVarLine: readonly string[]): boolean {
  const variables = locale.one<LangVariables>('variables')
  return variables.indexOf(keyword) !== -1 && !restOfVarLine.length
}

/**
 * Purge variable name of tokens.
 *
 * @param word - Algorithm variable with token.
 * @example
 * ```
 * purgeVarName('=') // return ' = '
 * purgeVarName(' ') // return ''
 * purgeVarName('\t') // return ''
 * purgeVarName(',') // return ''
 * purgeVarName(':') // return ''
 * purgeVarName('array[10]') // return 'array'
 * ```
 * @returns Javascript variable without token.
 */
function purgeVarName(word: string): string {
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
 * @param word - A Algorithm word.
 * @example
 * ```
 * prepareWord('=') // return ' = '
 * prepareWord(' ') // return ''
 * prepareWord('\t') // return ''
 * prepareWord(',') // return ''
 * prepareWord(':') // return ''
 * prepareWord('array[10]') // return 'array = new Vector(10)'
 * ```
 * @returns A Javacript word.
 */
function prepareWord(word: string): string {
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
 * @param store - Store of variables.
 * @param isA - Variable type.
 * @param word - Variable name.
 * @example
 * ```
 * // store generally is a reducer dispatchers
 * const store = {
 *   varAdd: () => {} // dispatch callback
 * }
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
 * ```
 */
function reserveVars(store, isA: string, word: string): void {
  const type = locale.one<LangType>('type')
  const error = locale.one<LangError>('error')
  const typeError = locale.one<LangTypeError>('typeError')
  if (!store || !store.varAdd) throw new Error(error.dispatchers)
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
      throw new Error(typeError.unknow(isA))
  }
}

/**
 * Ignore algorithm body.
 *
 * @param code - Algorithm code.
 * @example
 * ```
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  easy: boolean',
 *   'start',
 *   '   ...',
 *   'end'
 * ].join('\n')
 * ignoreSentences(code) // return the same code but start ... end block
 * ```
 * @returns Get the code, less the body (start ... end).
 */
function ignoreSentences(code: string): string {
  const begin = locale.one<string>('begin')
  const end = locale.one<string>('end')
  // return code.replace(code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))[0], '')
  return code.replace(RegExp(`([\\s\\S]*?)(\\n${begin}[\\s\\S]*?${end}$)`, 'gm'), '$1')
}
