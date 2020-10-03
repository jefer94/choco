import keychain from './keychain'

test('return correct key', () => {
  const elements = [0, 1, 2]
  elements.forEach((number) => {
    elements.forEach((key) => {
      expect(keychain(`key${number}`)).toBe(`key${number}_${key}`)
    })
  })
})
