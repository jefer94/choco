import locale from '@chocolab/i18n'
import { LangTranspiler, LangOpenBracket, LangCloseBracket, LangWrite, LangRead, LangType, LangVariables } from './lang/common'

const algorithmWord = locale.one<string>('algorithmWord')
const begin = locale.one<string>('begin')
const end = locale.one<string>('end')
const forWord = locale.one<string>('forWord')
const toWord = locale.one<string>('toWord')
const variables = locale.one<LangVariables>('variables')
const transpiler = locale.one<LangTranspiler>('transpiler')
const openBracket = locale.one<LangOpenBracket>('openBracket')
const closeBracket = locale.one<LangCloseBracket>('closeBracket')
const write = locale.one<LangWrite>('write')
const read = locale.one<LangRead>('read')
const type = locale.one<LangType>('type')

type Replacer = (substring?: readonly string[]) => string
type Token = readonly [RegExp, Replacer?]

export type ChocolabTokens = {
  readonly handlers: readonly Token[],
  readonly functions: readonly Token[],
  readonly properties: readonly Token[],
  readonly text: readonly Token[],
  readonly consts: readonly Token[],
  readonly vars: readonly Token[],
  readonly comments: readonly Token[],
  readonly numbers: readonly Token[],
  readonly strings: readonly Token[],
  readonly types: readonly Token[],
}

export function chocolabTokens(): ChocolabTokens {
  return {
    handlers: [
      [new RegExp(`(${read.join('|')})`, 'g')],
      [new RegExp(`(${write.join('|')})`, 'g')],
      [new RegExp(`(${openBracket.join('|')})`, 'g')],
      [new RegExp(`(${closeBracket.join('|')})`, 'g')],
      [new RegExp(`(${[...[algorithmWord, begin, end, forWord, toWord]].join('|')})`, 'g')],
      [new RegExp(`(${variables.join('|')})`, 'g')],
      [new RegExp(`(${[...Object.keys(transpiler)].join('|')})`, 'g')]
    ], // mora
    functions: [], // blue
    properties: [], // yelloc
    text: [], // white
    consts: [], // null
    vars: [], // white
    numbers: [[/([0-9]+\.[0-9]+|[0-9]+)/g]],
    strings: [[/("[^"]+")/g]],
    types: [[new RegExp(`(${Object.values(type).join('|')})`, 'g')]], // green
    comments: [[/(\/\/.*)$/g]] // dark green
  }
}
