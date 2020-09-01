import { useReducer, useEffect, useCallback, Dispatch } from 'react'
import locale from '@chocolab/i18n'
import tabsReducer, { Tab, LazyActions } from '../reducers/tabs'
import { addTabAction, removeTabAction, changeTabAction, saveTabAction, defaultsTabsAction } from '../actions/tabs'

const key = '__ALGORITHM_TABS__'
/**
 * Get defaults tabs
 * @example
 * ```
 * getDefaults()
 * ```
 * @returns Array of tabs
 */
function getDefaults(): readonly Tab[] {
  return [{
    id: '0',
    name: locale.one('editor'),
    content: locale.one('code'),
    active: true
  }]
}

type UseTab = {
  readonly tabs: readonly Tab[]
  readonly dispatch: Dispatch<LazyActions>
  readonly addTab: () => void
  readonly removeTab: (id: string) => void
  readonly changeTab: (id: string) => void
  readonly saveTab: (id: string, content: string) => void
  readonly defaultsTabs: () => void
}

export default function useTabs(): UseTab {
  const init = JSON.parse(localStorage.getItem(key) || 'null') || getDefaults()
  const [tabs, dispatch] = useReducer(tabsReducer, init)

  const addTab = useCallback(() => dispatch(addTabAction()), [dispatch])
  const removeTab = useCallback((id: string) => dispatch(removeTabAction(id)), [dispatch])
  const changeTab = useCallback((id: string) => dispatch(changeTabAction(id)), [dispatch])
  const saveTab = useCallback((id: string, content: string) =>
    dispatch(saveTabAction(id, content)), [dispatch])
  // const renameTab = useCallback((id: string) => dispatch(renameTabAction(id)), [dispatch])
  const defaultsTabs = useCallback(() => dispatch(defaultsTabsAction()), [dispatch])

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
