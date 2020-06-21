import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

test('hash', async () => {
  const hash = await encrypt('password')

  expect(await decrypt('password', hash)).toBeTruthy()
  expect(await decrypt('pass', hash)).toBeFalsy()
})
