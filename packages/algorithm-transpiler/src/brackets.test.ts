import brackets from './brackets'
import { algorithmTranspilerLang } from './lang'
import locale from '@chocolab/i18n'

locale.setLang('en')
algorithmTranspilerLang()

test('open brackets', () => {
  const openBrackets = ['do', 'until']
  openBrackets.forEach((v) => {
    const code = `... ${v}`.split(' ')
    const result = '... { '
    expect(brackets(code, '')).toBe(result)
  })
})

test('close brackets', () => {
  const closeBrackets = [
    // map
    'endif',
    'end_if',
    'endwhile',
    'end_while',
    'endfor',
    'end_for'
  ]
  closeBrackets.forEach((v) => {
    const code = `${v}`.split(' ')
    const result = '}'
    expect(brackets(code, '')).toBe(result)
  })
})
