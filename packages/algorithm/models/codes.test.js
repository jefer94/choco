import codes from './codes'

test('true', () => {
  const { id, name, code, userId, ...restOfCodes } = codes
  expect(Object.keys(restOfCodes)).toHaveLength(0)
  expect(id).toBe(String)
  expect(userId).toBe(String)
  expect(name).toBe(String)
  expect(code).toBe(String)
})