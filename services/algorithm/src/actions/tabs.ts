type AddTabAction = {
  readonly type: 'ADD_TAB'
}

/**
 * Add tab action.
 *
 * @example
 * ```
 * addTabAction() // return { type: 'ADD_TAB' }
 * ```
 * @returns Action.
 */
export const addTabAction = (): AddTabAction => ({
  type: 'ADD_TAB'
})

type RemoveTabAction = {
  readonly type: 'DELETE_TAB'
  readonly id: string
}

/**
 * Remove tab action.
 *
 * @param id - Action id.
 * @example
 * ```
 * removeTabAction(5) // return { type: 'DELETE_TAB', id: 5 }
 * ```
 * @returns Action.
 */
export const removeTabAction = (id: string): RemoveTabAction => ({
  type: 'DELETE_TAB',
  id
})

type ChangeTabAction = {
  readonly type: 'CHANGE_TAB'
  readonly id: string
}

/**
 * Change tab action.
 *
 * @param id - Action id.
 * @example
 * ```
 * changeTabAction(5) // return { type: 'CHANGE_TAB', id: 5 }
 * ```
 * @returns Action.
 */
export const changeTabAction = (id: string): ChangeTabAction => ({
  type: 'CHANGE_TAB',
  id
})

type SaveTabAction = {
  readonly type: 'SAVE_TAB'
  readonly id: string
  readonly content: string
}

/**
 * Save tab action.
 *
 * @param id - Action id.
 * @param content - Action content.
 * @example
 * ```
 * saveTabAction(5, 'Kassadin') // return { type: 'SAVE_TAB', id: 5, content: 'Kassadin' }
 * ```
 * @returns Action.
 */
export const saveTabAction = (id: string, content: string): SaveTabAction => ({
  type: 'SAVE_TAB',
  id,
  content
})

type DefaultsTabsAction = {
  readonly type: 'DEFAULTS_TABS'
}

/**
 * Defaults Tabs Action.
 *
 * @example
 * ```
 * defaultsTabsAction() // return { type: 'DEFAULTS_TABS' }
 * ```
 * @returns Action.
 */
export const defaultsTabsAction = (): DefaultsTabsAction => ({
  type: 'DEFAULTS_TABS'
})
