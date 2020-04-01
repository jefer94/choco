import locale from '@choco/i18n'
import diff from './diff'

locale.setLang('en')

test('check correct diff', () => {
  const alg = [
    'variables',
    '  bestAdc: string'
  ].join('\n')

  const js = 'var bestAdc'

  expect(diff(alg, js)).toBe(1) // return 1
})