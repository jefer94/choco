import generateToken from './generateToken'

test('token has correct characters', () => {
  const token = generateToken()
  expect(/^[a-zA-Z0-9+/=]+$/.test(token)).toBeTruthy()
})

test('token has more of 60 characters', () => {
  const token = generateToken()
  const hasMoreOf60Characters = token.length > 60
  expect(hasMoreOf60Characters).toBeTruthy()
})
