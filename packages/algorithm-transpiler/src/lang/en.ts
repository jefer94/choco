import locale from '@choco/i18n'
import { staticTokens } from './common'

const lang = 'en'

export default function() {
  locale.set(lang, 'algorithmWord', 'algorithm')
  locale.set(lang, 'begin', 'begin')
  locale.set(lang, 'end', 'end')
  locale.set(lang, 'forWord', 'for')
  locale.set(lang, 'toWord', 'until')
  locale.set(lang, 'trueWord', 'true')
  locale.set(lang, 'falseWord', 'false')

  locale.set(lang, 'tokens', { ...staticTokens, ...{
    // algorithm : js
    or: '||',
    and: '&&',
    not: '!'
  }})

  locale.set(lang, 'variables', [
    // map
    'variables',
    'var'
  ])

  locale.set(lang, 'transpiler', {
    // algorithm : js
    if: 'if',
    else: '}\nelse {',
    while: 'while',
    repeat: 'do {',
    until: '} while',
    for: 'for',
    do: 'do'
  })

  locale.set(lang, 'openBracket', [
    // map
    'do',
    'until'
  ])


  locale.set(lang, 'closeBracket', [
    // map
    'endif',
    'end_if',
    'endwhile',
    'end_while',
    'endfor',
    'end_for'
  ])

  locale.set(lang, 'write', [
    // map
    'show',
    'write',
    'print'
  ])

  locale.set(lang, 'read', [
    // map
    'read'
  ])

  locale.set(lang, 'type', {
    // type : algorithm
    int: 'integer',
    double: 'float',
    string: 'string',
    bool: 'boolean'
  })

  locale.set(lang, 'typeError', {
    // type : string in es
    int: 'Error: don\'t is integer',
    double: 'Error: don\'t is float',
    string: 'Error: don\'t is string',
    bool: 'Error: don\'t is boolean',
    unknow: (type) => `Error: ${type} is not a valid variable type`
  })

  locale.set(lang, 'error', {
    // error name : string in es
    stringForNumber: 'Error: a number cannot multiply a carapter',
    infinity: 'Error: dividing by 0 causes an infinite number',
    dispatchers: 'Error: dispatchers were not provided'
  })

  locale.set(lang, 'code', [
    'algorithm easy',
    'variables',
    'number, i, table[10]: integer',
    'begin',
    '  i <- 0',
    '  write "Enter number a multiplier: "',
    '  read number',
    '  while (i < 10) do',
    '    i <- i + 1',
    '    table[i] <- number * i',
    '    write number, " * ", i, " = ", number * i',
    '  endwhile',
    'end',
    ''
  ].join('\n'))
}
