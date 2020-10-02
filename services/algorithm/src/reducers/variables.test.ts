import reducer from './variables'
import { addVarAction, resetVarAction } from '../actions/variables'

test('add var', () => {
  Object.values(['int', 'string', 'double']).forEach((type) => {
    expect(reducer(null, addVarAction(type, 'senna'))).toEqual({
      senna: type
    })
  })
})

test('reset vars', () => {
  const vars = reducer({ senna: 'int', tristana: 'string' }, resetVarAction())

  expect(Object.keys(vars)).toHaveLength(0)
})

// test('default state', () => {
//   const vars = reducer(undefined, {})

//   expect(Object.keys(vars)).toHaveLength(0)
// })

// test('not action', () => {
//   const vars = reducer({}, {})

//   expect(Object.keys(vars)).toHaveLength(0)
// })
