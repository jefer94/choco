import { addVarAction, resetVarAction } from './variables'

test('add var object', () => {
  Object.values([1, 2, 3]).forEach((v) => {
    const text = `text${v}`
    const key = `key${v}`
    expect(addVarAction(text, key)).toEqual({
      type: 'VAR_ADD',
      text,
      key
    })
  })
})

test('reset vars object', () => {
  expect(resetVarAction()).toEqual({
    type: 'VAR_RESET'
  })
})
