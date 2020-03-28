import { addTabAction, removeTabAction, changeTabAction, saveTabAction, defaultsTabsAction, addVarAction, resetVarAction } from './'

import * as tabActions from './tabs'
import * as varActions from './variables'

test('import * from ./tabs', () => {
  const addTabSpy = jest.spyOn(tabActions, 'addTabAction')
  const removeTabSpy = jest.spyOn(tabActions, 'removeTabAction')
  const changeTabSpy = jest.spyOn(tabActions, 'changeTabAction')
  const saveTabSpy = jest.spyOn(tabActions, 'saveTabAction')
  const defaultsTabsSpy = jest.spyOn(tabActions, 'defaultsTabsAction')

  addTabAction()
  removeTabAction()
  changeTabAction()
  saveTabAction()
  defaultsTabsAction()

  expect(addTabSpy).toHaveBeenCalled()
  expect(removeTabSpy).toHaveBeenCalled()
  expect(changeTabSpy).toHaveBeenCalled()
  expect(saveTabSpy).toHaveBeenCalled()
  expect(defaultsTabsSpy).toHaveBeenCalled()
})

test('import * from ./variables', () => {
  const addVarSpy = jest.spyOn(varActions, 'addVarAction')
  const resetVarSpy = jest.spyOn(varActions, 'resetVarAction')

  addVarAction()
  resetVarAction()

  expect(addVarSpy).toHaveBeenCalled()
  expect(resetVarSpy).toHaveBeenCalled()
})
