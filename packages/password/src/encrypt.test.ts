import { encrypt } from './encrypt'

test('hash', async () => {
  const hash1 = await encrypt('password')
  expect(typeof hash1).toBe('string')
  expect(hash1).toBeTruthy()

  const hash2 = await encrypt('password', { rounds: 9 })
  expect(typeof hash2).toBe('string')
  expect(hash2).toBeTruthy()
})
