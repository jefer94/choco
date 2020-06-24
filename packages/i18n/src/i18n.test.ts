// import { setLang, all, one, set, getLang } from './i18n'
import { setLang, one, set, getLang } from './i18n'

type Things = {
  readonly cow: string,
  readonly potato: string
}

type Locale = readonly [string, Things]

test('check i18n work', () => {
  const locales: readonly Locale[] = [
    ['en', {
      cow: 'Cow',
      potato: 'Potato'
    }],
    ['es', {
      cow: 'Vaca',
      potato: 'Papa'
    }]
  ]
  locales.forEach(([lang, obj]) => {
    const set1Returns = set<string>(lang, 'cow', obj.cow)
    const set2Returns = set<string>(lang, 'potato', obj.potato)

    expect(set1Returns).toBeFalsy()
    expect(set2Returns).toBeFalsy()

    const setLangReturns = setLang(lang)

    expect(setLangReturns).toBeFalsy()

    const oneCow = one('cow')
    const onePotato = one('potato')

    expect(oneCow).toBe(obj.cow)
    expect(onePotato).toBe(obj.potato)

    // const { cow, potato, ...restOfLocales } = all()

    // expect(Object.keys(restOfLocales)).toHaveLength(0)

    // expect(cow).toBe(obj.cow)
    // expect(potato).toBe(obj.potato)
  })
})

// test('get all from unknow lang', () => {
//   setLang('af')
//   expect(all()).toEqual({})
// })

test('get one from unknow lang', () => {
  setLang('af')
  expect(one('potato')).toBeFalsy()
})

test('get correct lang', () => {
  const langs = ['en', 'es', 'af']
  langs.forEach((lang) => {
    setLang(lang)
    expect(getLang()).toBe(lang)
  })
})
