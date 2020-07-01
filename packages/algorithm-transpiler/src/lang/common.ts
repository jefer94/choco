export const staticTokens = {
  // algorithm : js
  '<>': '!==',
  '<=': '<=',
  '>=': '>=',
  '<': '<',
  '>': '>',
  '<-': '='
}

export type LangType = {
  readonly int: string
  readonly double: string
  readonly string: string
  readonly bool: string
}

export type LangError = {
  readonly stringForNumber: string
  readonly infinity: string
  readonly dispatchers: string
}

export type LangTypeError = {
  readonly int: string
  readonly double: string
  readonly string: string
  readonly bool: string
  readonly unknow: (type: string) => string
}

export type LangVariables = readonly string[]
export type LangOpenBracket = readonly string[]
export type LangCloseBracket = readonly string[]
export type LangRead = readonly string[]
export type LangWrite = readonly string[]
export type LangCode = readonly string[]

export type JavascriptType = 'int' | 'double' | 'string' | 'bool'
export type LangTokens = Record<string, string>
export type LangTranspiler = Record<string, string>
