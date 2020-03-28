import reducer from './tabs'
import { algorithmWord as tabName, code, editor, setLang } from '../libs/i18n'
import { addTabAction, removeTabAction, changeTabAction, saveTabAction, defaultsTabsAction } from '../actions/tabs'

let index = -1

function addTabItem(name, content, active) {
  index += 1
  return { id: index, name, content, active }
}

test('en locale, add tab', () => {
  index = -1
  setLang('en')

  const name = tabName.charAt(0).toUpperCase() + tabName.slice(1)
  const [tab, ...restOfTabs] = reducer([], addTabAction())
  expect(restOfTabs).toHaveLength(0)
  expect(tab.id).toBe(0)
  expect(tab.name).toBe(`${name} 0`)
  expect(tab.content).toBe('')
  expect(tab.active).toBe(false)
})

test('es locale, add tab', () => {
  setLang('es')
  index = -1

  const name = tabName.charAt(0).toUpperCase() + tabName.slice(1)
  const [tab, ...restOfTabs] = reducer([], addTabAction())
  expect(restOfTabs).toHaveLength(0)
  expect(tab.id).toBe(0)
  expect(tab.name).toBe(`${name} 0`)
  expect(tab.content).toBe('')
  expect(tab.active).toBe(false)
})

test('en locale, add tab with size > 0', () => {
  setLang('en')
  index = -1

  const tabs = [
    addTabItem('Tab1', 'a', false)
  ]

  const name = tabName.charAt(0).toUpperCase() + tabName.slice(1)
  const [tab1, tab2, ...restOfTabs] = reducer(tabs, addTabAction())
  expect(restOfTabs).toHaveLength(0)

  expect(tab1.id).toBe(0)
  expect(tab1.name).toBe('Tab1')
  expect(tab1.content).toBe('a')
  expect(tab1.active).toBe(false)

  expect(tab2.id).toBe(1)
  expect(tab2.name).toBe(`${name} 1`)
  expect(tab2.content).toBe('')
  expect(tab2.active).toBe(false)
})

test('es locale, add tab with size > 0', () => {
  setLang('es')
  index = -1

  const tabs = [
    addTabItem('Tab1', 'a', false)
  ]

  const name = tabName.charAt(0).toUpperCase() + tabName.slice(1)
  const [tab1, tab2, ...restOfTabs] = reducer(tabs, addTabAction())
  expect(restOfTabs).toHaveLength(0)

  expect(tab1.id).toBe(0)
  expect(tab1.name).toBe('Tab1')
  expect(tab1.content).toBe('a')
  expect(tab1.active).toBe(false)

  expect(tab2.id).toBe(1)
  expect(tab2.name).toBe(`${name} 1`)
  expect(tab2.content).toBe('')
  expect(tab2.active).toBe(false)
})

test('remove tab', () => {
  index = -1

  const tabs = [
    addTabItem('Tab1', 'a', false),
    addTabItem('Tab2', 'b', true)
  ]

  const [tab, ...restOfTabs] = reducer(tabs, removeTabAction(1))
  expect(restOfTabs).toHaveLength(0)
  expect(tab.id).toBe(0)
  expect(tab.name).toBe('Tab1')
  expect(tab.content).toBe('a')
  expect(tab.active).toBe(true)
})

test('change tab', () => {
  index = -1

  const tabs = [
    addTabItem('Tab1', 'a', false),
    addTabItem('Tab2', 'b', false)
  ]

  Object.values(tabs).forEach((v) => {
    const [tab1, tab2, ...restOfTabs] = reducer(tabs, changeTabAction(v.id))
    expect(restOfTabs).toHaveLength(0)
    expect(tab1.id).toBe(0)
    expect(tab1.content).toBe('a')
    expect(tab1.active).toBe(tab1.id === v.id)

    expect(tab2.id).toBe(1)
    expect(tab2.content).toBe('b')
    expect(tab2.active).toBe(tab2.id === v.id)
  })
})

test('save tab', () => {
  index = -1
  
  const tabs = [
    addTabItem('Tab1', 'a', false),
    addTabItem('Tab2', 'b', true)
  ]

  Object.values(tabs).forEach((v) => {
    const testContent = `content${v.id}`
    const [tab1, tab2, ...restOfTabs] = reducer(tabs, saveTabAction(v.id, testContent))
    expect(restOfTabs).toHaveLength(0)
    expect(tab1.id).toBe(0)
    expect(tab1.name).toBe('Tab1')
    expect(tab1.content).toBe(tab1.id === v.id ? testContent : 'a')
    expect(tab1.active).toBe(false)

    expect(tab2.id).toBe(1)
    expect(tab2.name).toBe('Tab2')
    expect(tab2.content).toBe(tab2.id === v.id ? testContent : 'b')
    expect(tab2.active).toBe(true)
  })
})

test('en locale default tabs', () => {
  setLang('en')
  const defaults = [{
    id: 0,
    name: editor,
    content: code,
    active: true
  }]

  index = -1
  
  const tabs = [
    addTabItem('Tab1', 'a', false),
    addTabItem('Tab2', 'b', true)
  ]

  const [tab, ...restOfTabs] = reducer(tabs, defaultsTabsAction())
  expect(restOfTabs).toHaveLength(0)
  expect(tab.id).toBe(0)
  expect(tab.name).toBe(editor)
  expect(tab.content).toBe(code)
  expect(tab.active).toBe(true)
})

test('es locale default tabs', () => {
  setLang('es')
  const defaults = [{
    id: 0,
    name: editor,
    content: code,
    active: true
  }]

  index = -1
  
  const tabs = [
    addTabItem('Tab1', 'a', false),
    addTabItem('Tab2', 'b', true)
  ]

  const [tab, ...restOfTabs] = reducer(tabs, defaultsTabsAction())
  expect(restOfTabs).toHaveLength(0)
  expect(tab.id).toBe(0)
  expect(tab.name).toBe(editor)
  expect(tab.content).toBe(code)
  expect(tab.active).toBe(true)
})

test('not change', () => {
  index = -1
  
  const tabs = [
    addTabItem('Tab1', 'a', false),
    addTabItem('Tab2', 'b', true)
  ]

  const [tab1, tab2, ...restOfTabs] = reducer(tabs, {})
  expect(restOfTabs).toHaveLength(0)

  expect(tab1.id).toBe(0)
  expect(tab1.name).toBe('Tab1')
  expect(tab1.content).toBe('a')
  expect(tab1.active).toBe(false)

  expect(tab2.id).toBe(1)
  expect(tab2.name).toBe('Tab2')
  expect(tab2.content).toBe('b')
  expect(tab2.active).toBe(true)
})

test('en locale default', () => {
  setLang('en')
  index = -1

  const [tab, ...restOfTabs] = reducer(undefined, {})
  expect(restOfTabs).toHaveLength(0)

  expect(tab.id).toBe(0)
  expect(tab.name).toBe(editor)
  expect(tab.content).toBe(code)
  expect(tab.active).toBe(true)
})

test('es locale default', () => {
  setLang('es')
  index = -1

  const [tab, ...restOfTabs] = reducer(undefined, {})
  expect(restOfTabs).toHaveLength(0)

  expect(tab.id).toBe(0)
  expect(tab.name).toBe(editor)
  expect(tab.content).toBe(code)
  expect(tab.active).toBe(true)
})
