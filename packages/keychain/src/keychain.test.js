import keychain from './keychain'

test('return correct key', () => {
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) expect(keychain(`key${i}`)).toBe(`key${i}_${j}`)
})
