import { useReducer, useEffect, useCallback } from 'react'
import { code } from '../libs/i18n'
import tabsReducer from '../reducers/tabs'
import { addTabAction, removeTabAction, changeTabAction, saveTabAction, defaultsTabsAction } from '../actions/tabs'

const key = '__ALGORITHM_TABS__'
const defaults = [{
  id: 0,
  name: 'Editor',
  content: code,
  active: true
}]

export default function () {
  const init = JSON.parse(localStorage.getItem(key) || 'null') || defaults
  const [tabs, dispatch] = useReducer(tabsReducer, init)

  const addTab = useCallback(() => dispatch(addTabAction()), [dispatch])
  const removeTab = useCallback((id) => dispatch(removeTabAction(id)), [dispatch])
  const changeTab = useCallback((id) => dispatch(changeTabAction(id)), [dispatch])
  const saveTab = useCallback((id, content) => dispatch(saveTabAction(id, content)), [dispatch])
  // const renameTab = useCallback((id) => dispatch(renameTabAction(id)), [dispatch])
  const defaultsTabs = useCallback((id) => dispatch(defaultsTabsAction(id)), [dispatch])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tabs))
  }, [tabs])

  return {
    tabs,
    dispatch,
    addTab,
    removeTab,
    changeTab,
    saveTab,
    // renameTab,
    defaultsTabs
  }
}
