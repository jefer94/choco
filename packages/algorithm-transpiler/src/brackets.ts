import locale from '@choco/i18n'
import { Dictionary } from '@choco/types'
import { LangOpenBracket, LangCloseBracket } from '../dist/lang/common'

/**
 * Generate javascript brackets.
 *
 * @param keywords - Keywords.
 * @param currentJS - Current JS.
 * @returns Javascript brackets.
 */
export default function brackets(keywords: readonly string[], currentJS: string): string {
  let js = currentJS
  Object.keys(keywords).map(Number).forEach((key) => {
    js += bracketsLine(keywords[key])
  })
  return js
}

/**
 * Generate javascript brackets for line.
 *
 * @param keyword - Keyword.
 * @returns Javascript brackets for line.
 */
function bracketsLine(keyword: string): string {
  const openBracket = locale.one<LangOpenBracket>('openBracket')
  const closeBracket = locale.one<LangCloseBracket>('closeBracket')
  const transpiler = locale.one<Dictionary>('transpiler')
  const tokens = locale.one<Dictionary>('tokens')
  if (openBracket.indexOf(keyword) !== -1) return '{ '
  if (closeBracket.indexOf(keyword) !== -1) return '}'
  if (transpiler[keyword]) return `${transpiler[keyword]} `
  if (tokens[keyword]) return `${tokens[keyword]} `
  return `${keyword} `
}
