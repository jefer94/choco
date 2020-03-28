import { addVarAction, resetVarAction } from './variables'

test('add var object', () => {
  Object.values([1, 2, 3]).forEach((v) => {
    const testText = 'text' + v
    const testKey = 'key' + v
    const {type, text, key, ...restOfProperties} = addVarAction(testText, testKey)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(text).toBe(testText)
    expect(key).toBe(testKey)
  })
})

test('reset vars object', () => {
  const {type, ...restOfProperties} = resetVarAction()
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(type).toBe('VAR_RESET')
})