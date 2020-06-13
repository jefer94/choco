import locale from '@choco/i18n'
import { compose } from '@choco/functional'
import comments from './comments'
import { algorithmTranspilerLang } from './lang'
import { LangOpenBracket, LangRead, LangWrite, LangCloseBracket } from './lang/common'

algorithmTranspilerLang()

/** @module libs/algorithm/transform */

// transform between native languaje and javascipt
export default function (code) {
  const { tokens, transpiler } = locale.all()
  const openBracket = locale.one<LangOpenBracket>('openBracket')
  const closeBracket = locale.one<LangCloseBracket>('closeBracket')
  const read = locale.one<LangRead>('read')
  const write = locale.one<LangWrite>('write')
  let line = compose(stripCode, comments)(code) // stripCode(code)
  let js = ''

  Object.keys(line).map(Number).forEach((i) => {
    // ...
    line[i] = line[i] = compose(purgeComment, purgeLine, vectorAdd)(line[i])

    if (line[i].substr(0, 1) === ' ') {
      const length = line[i].length - 1
      line[i] = line[i].substr(1, length)
    }

    const length = line[i].length - 1
    while (line[i].substr(length, 1) === ' ') line[i] = line[i].substr(0, length)

    if (line[i] === '') return

    line = ifIsEqual(line)

    line[i] = compose(forLoopCondition, doWhileLoopCondition)(line[i])

    // each word is separated into a array
    const word = line[i].split(' ')

    Object.keys(word).map(Number).forEach((key) => {
      if (openBracket.indexOf(word[key]) !== -1) js += '{ '
      else if (closeBracket.indexOf(word[key]) !== -1) js += '}'
      else if (transpiler[word[key]]) js += `${transpiler[word[key]]} `
      else if (tokens[word[key]]) js += `${tokens[word[key]]} `
      else js += `${word[key]} `
    })

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

    else if (write.indexOf(word[0]) !== -1) {
      js = js.replace(
        write[write.indexOf(word[0])],
        'eval(write('
      )
      js += '));\n'
    }
    else if (read.indexOf(word[0]) !== -1) {
      js = js.replace(
        read[read.indexOf(word[0])],
        'eval(read("'
      )
      js += '"));\n'
    }
    else js += ';\n'
  })
  return js
}

export function forLoopCondition(lineArg) {
  const { toWord } = locale.all()

  // for (...)
  let line = lineArg
  const matchCondition = line.match(RegExp(`([\\s\\S]+${toWord}[\\s\\S]+)`))
  if (matchCondition) {
    let [conditionsFor] = matchCondition
    conditionsFor = conditionsFor.split(toWord)
    const ref = matchCondition[0].split(toWord)
    conditionsFor[0] += ';'
    conditionsFor[1] = conditionsFor[1].replace('=', '<=')
    if (conditionsFor[1].search('reversed') === -1) conditionsFor[1] = conditionsFor[1].replace(')', '; i++)')
    else conditionsFor[1] = conditionsFor[1].replace(')', '; i--)')
    line = line.replace(ref[0], conditionsFor[0])
    line = line.replace(ref[1], conditionsFor[1])
    line = line.replace(toWord, '')
  }
  return line
}

export function doWhileLoopCondition(line) {
  const { toWord } = locale.all()

  // do ... while (!...)
  if (line.match(RegExp(`${toWord}\\s+([\\s\\S]+)`))) return line.replace('(', '(!(')
    .replace(/\)\s{0,}$/, '))')
    .replace(/=/g, '===')
  return line
}
/**
 * Add assignment in Vector.
 *
 * @param {string} lineArg - Line of code.
 * @example
 * vectorAdd('stuff.io(7) <- 9') // return 'stuff.io(7).add(9)'
 * @returns {string} Line of code.
 */
export function vectorAdd(lineArg) {
  let line = lineArg
  // vector.io(n).add(value)
  while (line.match(/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/)) {
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
 * @param {string} line - Line of code.
 * @example
 * purgeLine('function stuff()do') // return 'function stuff () do'
 * purgeLine('array[13]') // return 'array.io(13)'
 * @returns {string} Line of code
 */
export function purgeLine(line) {
  return line
    .replace(/\(/g, ' (')
    .replace(/\)/g, ') ')
    .replace(/ {2}/g, ' ')
    .replace(/\[/g, '.io(')
    .replace(/\]/g, ')')
}

/**
 * Purge comments of code.
 *
 * @param {string} lineArg - Line of code.
 * @example
 * purgeComment('for (bestADC === \'Tristana\') do // some stuff')
 * // return 'for (bestADC === \'Tristana\') do '
 * @returns {string} Line of code.
 */
export function purgeComment(lineArg) {
  // ...
  let line = lineArg
  if (line.search('//') !== -1) {
    const remove = line.substr(line.search('//'), line.length)
    line = line.replace(remove, '')
  }
  return line
}

export function stripCode(codeArg: string): readonly string[] {
  const begin = locale.one<string>('begin')
  const end = locale.one<string>('end')

  // good in this space we are going to make a separation between the code
  // and the variables
  const [code] = codeArg.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))
  // each line is separated into a array
  const lines = code.split('\n')

  // the word "fin" is deleted
  if (lines[lines.length - 1].search(end) !== -1) lines.pop()

  // reverse the line of array
  lines.reverse()
  // the word "inicio" is deleted
  if (lines[lines.length - 1].search(begin) !== -1) lines.pop()

  // reverse the line of array
  lines.reverse()
  return lines
}

/**
 * Parse equal token from Algorithm to Javascript.
 *
 * @param {string[]} lines - Line of code.
 * @example
 * ifIsEqual(['for (text = \'Not text\') do'])
 * // return ['for (text === \'Not text\') do']
 * @returns {string[]} Lines of code.
 */
function ifIsEqual(lines: readonly string[]): readonly string[] {
  const openBracket = locale.one<LangOpenBracket>('openBracket')

  // if (x === y)
  return lines.map((line: string) =>
    openBracket.reduce((current: string, bracket: string) => {
      if (line.match(RegExp(`=(.)+${bracket}`))) return line.replace(/=/g, ' === ')
      return current
    }, line))
}
