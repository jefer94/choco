import locale from '@choco/i18n'
import diff from './diff'
import { algorithmTranspilerLang } from './lang'

locale.setLang('en')
algorithmTranspilerLang()

// test('check correct diff without begin block', () => {
//   const alg = [
//     'variables',
//     '  bestAdc: string'
//   ].join('\n')

//   const js = 'var bestAdc'

//   expect(diff(alg, js)).toBe(2) // return 1
// })

test('check correct diff with begin block', () => {
  const alg = [
    'variables',
    '  bestAdc: string',
    'begin',
    '  ...',
    'end'
  ].join('\n')

  const js = 'var bestAdc\n...'

  expect(diff(alg, js)).toBe(2) // return 1
})
