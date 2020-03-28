import { addTabAction, removeTabAction, changeTabAction, saveTabAction, defaultsTabsAction } from './tabs'

test('add tab object', () => {
  const {type, ...restOfProperties} = addTabAction()
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(type).toBe('ADD_TAB')
})

test('remove tab object', () => {
  [1, 2, 3].forEach((v) => {
    const {id, type, ...restOfProperties} = removeTabAction(v)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(id).toBe(v)
    expect(type).toBe('DELETE_TAB')
  })  
})

test('change tab object', () => {
  [1, 2, 3].forEach((v) => {
    const {id, type, ...restOfProperties} = changeTabAction(v)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(id).toBe(v)
    expect(type).toBe('CHANGE_TAB')
  })  
})

test('save tab object', () => {
  [1, 2, 3].forEach((v) => {
    const testContent = 'content' + v
    const {id, content, type, ...restOfProperties} = saveTabAction(v, testContent)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(id).toBe(v)
    expect(content).toBe(testContent)
    expect(type).toBe('SAVE_TAB')
  })  
})

test('default tabs object', () => {
  const {type, ...restOfProperties} = defaultsTabsAction()
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(type).toBe('DEFAULTS_TABS')
})

defaultsTabsAction