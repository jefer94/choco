import codeModel from './code'

test('true', () => {
  const { id, name, code, projectId, ...restOfCodes } = codeModel
  expect(Object.keys(restOfCodes)).toHaveLength(0)
  expect(id).toBe(String)
  expect(projectId).toBe(String)
  expect(name).toBe(String)
  expect(code).toBe(String)
})