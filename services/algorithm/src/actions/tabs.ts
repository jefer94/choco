/**
 * Add tab action.
 *
 * @example
 * ```
 * addTabAction() // return { type: 'ADD_TAB' }
 * ```
 * @returns Action.
 */
export const addTabAction = () => ({
  type: 'ADD_TAB'
})

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
export const removeTabAction = (id) => ({
  type: 'DELETE_TAB',
  id
})

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
export const changeTabAction = (id) => ({
  type: 'CHANGE_TAB',
  id
})

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
export const saveTabAction = (id, content) => ({
  type: 'SAVE_TAB',
  id,
  content
})

/**
 * Defaults Tabs Action.
 *
 * @example
 * ```
 * defaultsTabsAction() // return { type: 'DEFAULTS_TABS' }
 * ```
 * @returns Action.
 */
export const defaultsTabsAction = () => ({
  type: 'DEFAULTS_TABS'
})
