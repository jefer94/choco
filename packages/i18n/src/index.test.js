import { setLang, all, one, set } from './'

test('check i18n work', () => {
  [
    ['en', {
      cow: 'Cow',
      potato: 'Potato'
    }],
    ['es', {
      cow: 'Vaca',
      potato: 'Papa'
    }]
  ].map(([lang, obj]) => {
    const set1Returns = set(lang, 'cow', obj.cow)
    const set2Returns = set(lang, 'potato', obj.potato)

    expect(set1Returns).toBeFalsy()
    expect(set2Returns).toBeFalsy()

    const setLangReturns = setLang(lang)

    expect(setLangReturns).toBeFalsy()

    const oneCow = one('cow')
    const onePotato = one('potato')

    expect(oneCow).toBe(obj.cow)
    expect(onePotato).toBe(obj.potato)

    const { cow, potato, ...restOfLocales } = all()

    expect(Object.keys(restOfLocales)).toHaveLength(0)

    expect(cow).toBe(obj.cow)
    expect(potato).toBe(obj.potato)
  })
})
