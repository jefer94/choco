import keychain from './keychain'

test('return correct key', () => {
  const elements = [1, 2, 3]
  elements.forEach((number) => {
    elements.forEach((key) => {
      expect(keychain(`key${number}`)).toBe(`key${number}_${key}`)
    })
  })
})
