import variables from './variables'
import { algorithmTranspilerLang } from './lang'
import locale from '@choco/i18n'

locale.setLang('en')
algorithmTranspilerLang()

const code = `variables
number, i, table[10]: integer
begin
  ...
end`

const storeMock = {
  varAdd(type, name) {
    this.store = this.store || {}
    this.store[name] = type
  }
}

test('should transpile variables with comments', () => {
  const codeWithComments = [
    'variables // hi hi hi hi hi hi hi!',
    'number, i, table[10]: integer // you are potato',
    'begin',
    '  ...',
    'end'
  ].join('\n')

  const vars = variables(codeWithComments, storeMock)

  expect(typeof vars).toBe('string')

  const [line1, line2, line3, ...restOfLines] = vars.split('\n')

  expect(restOfLines.length).toBe(0)
  expect(line1).toBe('var number;')
  expect(line2).toBe('var i;')
  expect(line3).toBe('var table = new Vector(10);')
})

test('should transpile variables', () => {
  const vars = variables(code, storeMock)

  expect(typeof vars).toBe('string')

  const [line1, line2, line3, ...restOfLines] = vars.split('\n')

  expect(restOfLines.length).toBe(0)
  expect(line1).toBe('var number;')
  expect(line2).toBe('var i;')
  expect(line3).toBe('var table = new Vector(10);')
})

test('get vars', () => {
  storeMock.store = {}
  const codeWithComments = [
    'variables',
    '  v1: integer',
    '  v2: float',
    '  v3: string',
    '  v4: boolean',
    'begin',
    '  ...',
    'end'
  ].join('\n')

  variables(codeWithComments, storeMock)

  const { v1, v2, v3, v4, ...restOfVars } = storeMock.store

  expect(Object.keys(restOfVars).length).toBe(0)
  expect(v1).toBe('int')
  expect(v2).toBe('double')
  expect(v3).toBe('string')
  expect(v4).toBe('bool')
})

test('bad var type', () => {
  const codeWithComments = [
    'variables',
    '  v1: choco',
    'begin',
    '  ...',
    'end'
  ].join('\n')

  expect(() => variables(codeWithComments, storeMock)).toThrow('Error: choco is not a valid variable type')
})

test('work with bad indentation and spaces in the end', () => {
  storeMock.store = {}
  const codeWithComments = [
    '             variables                                         ',
    '                 cocoa:            integer                       ',
    '                            begin                             ',
    '                           ...                           ',
    '                           end                           '
  ].join('\n')

  variables(codeWithComments, storeMock)

  const { cocoa, ...restOfVars } = storeMock.store

  expect(Object.keys(restOfVars).length).toBe(0)
  expect(cocoa).toBe('int')
})

test('dispatchers were not provided', () => {
  const codeWithComments = [
    'variables',
    '  v1: choco',
    'begin',
    '  ...',
    'end'
  ].join('\n')

  expect(() => variables(codeWithComments)).toThrow('Error: dispatchers were not provided')
})

test('variables were not provided', () => {
  const codeWithComments = [
    'begin',
    '  ...',
    'end'
  ].join('\n')

  expect(variables(codeWithComments, storeMock)).toBe('')
})
