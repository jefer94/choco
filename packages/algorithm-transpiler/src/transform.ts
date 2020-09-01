import locale from '@chocolab/i18n'
import { compose } from '@chocolab/functional'
import comments from './comments'
import { algorithmTranspilerLang } from './lang'
import { LangOpenBracket, LangRead, LangWrite, LangCloseBracket, LangTokens, LangTranspiler } from './lang/common'

algorithmTranspilerLang()

// transform between native languaje and javascipt
export default function transform(code: string): string {
  let line = compose<string[], string>(stripCode, comments)(code) // stripCode(code)
  let js = ''

  Object.keys(line).map(Number).forEach((i) => {
    // ...
    line[i] = compose<string, string>(comments, purgeLine, vectorAdd)(line[i])

    // remove space in start
    // if (line[i].substr(0, 1) === ' ') {
    //   const length = line[i].length - 1
    //   line[i] = line[i].substr(1, length)
    // }

    // remove space in end
    // const length = line[i].length - 1
    // while (line[i].substr(length, 1) === ' ') line[i] = line[i].substr(0, length)

    if (line[i] === '') return

    line = ifIsEqual(line)

    line[i] = compose<string, string>(forLoopCondition, doWhileLoopCondition)(line[i])

    // each word is separated into a array
    const word = line[i].split(' ')

    js = parser(word, js)
    word.reverse()
    // then in spaceInStart assign the last element in the stack
    let spaceInStart = word.pop()
    const ifNoHaveSpaceInStart = spaceInStart
    // while it is equal at ""
    // assign at spaceInStart the last element in the stack
    while (spaceInStart === '') spaceInStart = word.pop()

    // the last element never is ""
    if (typeof spaceInStart === 'undefined') word.push(ifNoHaveSpaceInStart)
    else word.push(spaceInStart)
    // and reverse the array again to finish
    word.reverse()

    const lastLine = js.split('\n')[js.split('\n').length - 1]
    if (lastLine.search('{') !== -1 || lastLine.search('}') !== -1) js += '\n'
    else js = parseIO(word, js)
  })
  return js
}

/**
 * Parse IO words.
 *
 * @param words - IO 2ords of line.
 * @param state - IO 2ords of line.
 * @returns Parsed IO words.
 */
export function parseIO(words: readonly string[], state: string): string {
  const read = locale.one<LangRead>('read')
  const write = locale.one<LangWrite>('write')
  const firstWord = words[0]
  let js = state || ''
  if (write.indexOf(firstWord) !== -1) {
    js = js.replace(
      write[write.indexOf(firstWord)],
      'eval(write('
    )
    js += '));\n'
  }
  else if (read.indexOf(firstWord) !== -1) {
    js = js.replace(
      read[read.indexOf(firstWord)],
      'eval(read("'
    )
    js += '"));\n'
  }
  else js += ';\n'
  return js
}

/**
 * Parse words.
 *
 * @param words - Words of line.
 * @param state - Javascript state.
 * @returns Parsed words.
 */
export function parser(words: readonly string[], state: string): string {
  const tokens = locale.one<LangTokens>('tokens')
  const transpiler = locale.one<LangTranspiler>('transpiler')
  const openBracket = locale.one<LangOpenBracket>('openBracket')
  const closeBracket = locale.one<LangCloseBracket>('closeBracket')
  let js = state || ''

  Object.keys(words).map(Number).forEach((key) => {
    const word = words[key]
    if (openBracket.indexOf(word) !== -1) js += '{ '
    else if (closeBracket.indexOf(word) !== -1) js += '}'
    else if (transpiler[word]) js += `${transpiler[word]} `
    else if (tokens[word]) js += `${tokens[word]} `
    else js += `${word} `
  })

  return js
}

/**
 * Generate for loop.
 *
 * @param lineArg - Line.
 * @returns Line with for loop.
 */
export function forLoopCondition(lineArg: string): string {
  const toWord = locale.one<string>('toWord')

  // for (...)
  let line = lineArg
  const matchCondition = line.match(RegExp(`([\\s\\S]+${toWord}[\\s\\S]+)`))
  if (matchCondition) {
    const [firstMatch] = matchCondition
    const conditionsFor = firstMatch.split(toWord)
    const ref = matchCondition[0].split(toWord)
    conditionsFor[0] += ';'
    if (conditionsFor[1].search('reversed') === -1) {
      conditionsFor[1] = conditionsFor[1].replace('=', '<=')
      conditionsFor[1] = conditionsFor[1].replace(')', '; i++)')
    }
    else {
      conditionsFor[1] = conditionsFor[1].replace('=', '>=')
      conditionsFor[1] = conditionsFor[1].replace(/ +reversed/, '').replace(')', '; i--)')
    }
    line = line.replace(ref[0], conditionsFor[0])
    line = line.replace(ref[1], conditionsFor[1])
    line = line.replace(toWord, '')
  }
  return line
}

/**
 * Generate white loop.
 *
 * @param line - Line of code.
 * @returns Line of code.
 */
export function doWhileLoopCondition(line: string): string {
  const toWord = locale.one<string>('toWord')

  // do ... while (!...)
  if (RegExp(`${toWord}\\s+([\\s\\S]+)`).test(line)) {
    return line.replace('(', '(!(')
      .replace(/\)\s{0,}$/, '))')
      .replace(/=/g, '===')
  }
  return line
}

/**
 * Add assignment in Vector.
 *
 * @param lineArg - Line of code.
 * @example
 * ```
 * vectorAdd('stuff.io(7) <- 9') // return 'stuff.io(7).add(9)'
 * ```
 * @returns Line of code.
 */
export function vectorAdd(lineArg: string): string {
  let line = lineArg
  // vector.io(n).add(value)
  // eslint-disable-next-line functional/no-loop-statement
  while (/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/.test(line)) {
    line = line.replace(/<-/, '')
    const exp = line.match(/\S+/g)
    line = `${exp[0]}.add(`
    if (Number.isNaN(+exp[1])) line += `"${exp[1]}"`
    else line += exp[1]
    line += ')'
  }
  return line
}

/**
 * Add space to prevent bad transpile, and transform array to class Vector.
 *
 * @param line - Line of code.
 * @example
 * ```
 * purgeLine('function stuff()do') // return 'function stuff () do'
 * purgeLine('array[13]') // return 'array.io(13)'
 * ```
 * @returns Line of code.
 */
export function purgeLine(line: string): string {
  return line
    .replace(/\(/g, ' (')
    .replace(/\)/g, ') ')
    .replace(/ +/g, ' ')
    .replace(/\[/g, '.io(')
    .replace(/\]/g, ')')
}

/**
 * Strip code.
 *
 * @param codeArg - Code to be striped.
 * @returns Code striped.
 */
export function stripCode(codeArg: string): readonly string[] {
  const begin = locale.one<string>('begin')
  const end = locale.one<string>('end')

  const [code] = codeArg.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))
  const lines = code.split('\n')

  if (lines[lines.length - 1].search(end) !== -1) lines.pop()
  lines.reverse()

  if (lines[lines.length - 1].search(begin) !== -1) lines.pop()
  lines.reverse()

  return lines
}

/**
 * Parse equal token from Algorithm to Javascript.
 *
 * @param lines - Line of code.
 * @example
 * ```
 * ifIsEqual(['for (text = \'Not text\') do'])
 * // return ['for (text === \'Not text\') do']
 * ```
 * @returns Lines of code.
 */
export function ifIsEqual(lines: readonly string[]): string[] {
  const openBracket = locale.one<LangOpenBracket>('openBracket')

  // if (x === y)
  return lines.map((line: string) =>
    openBracket.reduce((current: string, bracket: string) => {
      if (line.match(RegExp(`=(.)+${bracket}`))) return line.replace(/ *= */g, ' === ')
      return current
    }, line))
}
