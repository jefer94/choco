import locale from '@chocolab/i18n'
import files from './files'
import { algorithmTranspilerLang } from './lang'

algorithmTranspilerLang()
locale.setLang('en')
const code = locale.one<string>('code')

test('return correct name', () => {
  const expectResult = code.split('\n').slice(1).join('\n')
  const [name, result, ...rest] = files(code)

  expect(rest.length).toBe(0)
  expect(name).toBeTruthy()
  expect(typeof name).toBe('string')
  expect(result).toBe(expectResult)
})

test('throw if first line is wrong', () => {
  const wrongCode = code.split('\n').slice(1).join('\n')

  expect(() => files(wrongCode)).toThrow(new Error('name is invalid'))
})
