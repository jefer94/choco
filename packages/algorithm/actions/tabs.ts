/**
 * @typedef {object} SimpleAction
 * @property {string} type - Action type.
 */

/**
 * @typedef {object} IdAction
 * @property {string} type - Action type.
 * @property {number} id - Action id.
 */

/**
 * @typedef {object} IdContentAction
 * @property {string} type - Action type.
 * @property {number} id - Action id.
 * @property {string} content - Action type.
 */

/**
 * Add tab action.
 *
 * @example
 * addTabAction() // return { type: 'ADD_TAB' }
 * @returns {SimpleAction} Action.
 */
export const addTabAction = () => ({
  type: 'ADD_TAB'
})

/**
 * Remove tab action.
 *
 * @param {number} id - Action id.
 * @example
 * removeTabAction(5) // return { type: 'DELETE_TAB', id: 5 }
 * @returns {IdAction} Action.
 */
export const removeTabAction = (id) => ({
  type: 'DELETE_TAB',
  id
})

/**
 * Change tab action.
 *
 * @param {number} id - Action id.
 * @example
 * changeTabAction(5) // return { type: 'CHANGE_TAB', id: 5 }
 * @returns {IdAction} Action.
 */
export const changeTabAction = (id) => ({
  type: 'CHANGE_TAB',
  id
})

/**
 * Save tab action.
 *
 * @param {number} id - Action id.
 * @param {string} content - Action content.
 * @example
 * saveTabAction(5, 'Kassadin') // return { type: 'SAVE_TAB', id: 5, content: 'Kassadin' }
 * @returns {IdContentAction} Action.
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
 * defaultsTabsAction() // return { type: 'DEFAULTS_TABS' }
 * @returns {SimpleAction} Action.
 */
export const defaultsTabsAction = () => ({
  type: 'DEFAULTS_TABS'
})
