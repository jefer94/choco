import es from '../lang/es'

/** @module libs/algorithm/i18n */

// import language
// const locale = window ? window.navigator.language.substr(0, 2) : 'en'
const locale = 'en'

/**
 * Generic conversions of tokens between Javascript and Algorithms.
 *
 * @constant {object.<string, string>}
 * @default
 */
export const staticTokens = {
  // algorithm : js
  '<>': '!==',
  '<=': '<=',
  '>=': '>=',
  '<': '<',
  '>': '>',
  '<-': '='
}

// interface
export let algorithmWord
export let begin
export let end
export let forWord
export let toWord
export let trueWord
export let falseWord
export let tokens
export let variables
export let transpiler
export let openBracket
export let closeBracket
export let write
export let read
export let type
export let typeError
export let error
export let code
export let menu
export let addTab
export let removeTab
export let editor

/**
 * Reload locales by language.
 *
 * @param {string} langArg - Language.
 * @example
 * setLang('en')
 */
export function setLang(langArg) {
  const langcode = langArg || locale

  const lang = langcode === 'es' ?
    es :
    es

  algorithmWord = lang.algorithmWord
  begin = lang.begin
  end = lang.end
  forWord = lang.forWord
  toWord = lang.toWord
  trueWord = lang.trueWord
  falseWord = lang.falseWord
  tokens = { ...staticTokens, ...lang.tokens }
  variables = lang.variables
  transpiler = lang.transpiler
  openBracket = lang.openBracket
  closeBracket = lang.closeBracket
  write = lang.write
  read = lang.read
  type = lang.type
  typeError = lang.typeError
  error = lang.error
  code = lang.code
  menu = lang.menu
  addTab = lang.addTab
  removeTab = lang.removeTab
  editor = lang.editor
}

setLang()

export default {
  algorithmWord,
  begin,
  end,
  forWord,
  toWord,
  trueWord,
  falseWord,
  tokens,
  variables,
  transpiler,
  openBracket,
  closeBracket,
  write,
  read,
  type,
  typeError,
  error,
  code,
  menu,
  addTab,
  removeTab,
  editor
}
