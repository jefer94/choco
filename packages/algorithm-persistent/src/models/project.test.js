import projectModel from './project'

test('true', () => {
  const { id, name, description, userId, ...restOfCodes } = projectModel
  expect(Object.keys(restOfCodes)).toHaveLength(0)
  expect(id).toBe(String)
  expect(userId).toBe(String)
  expect(name).toBe(String)
  expect(description).toBe(String)
})