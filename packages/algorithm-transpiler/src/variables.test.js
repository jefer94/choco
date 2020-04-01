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
  variables(code, storeMock)

  const { number, i, table, ...restOfVars } = storeMock.store

  expect(Object.keys(restOfVars).length).toBe(0)
  expect(number).toBe('int')
  expect(i).toBe('int')
  expect(table).toBe('int')
})
