/**
 * @typedef {object} AddVarAction
 * @property {string} type - Action type.
 * @property {number} id - Action id.
 */

/**
 * Add Var Action.
 *
 * @param {string} text - Name of var.
 * @param {string} key - Type of var.
 * @example
 * addVarAction('Kassadin', 'string') // return { type: 'VAR_ADD', text: 'Kassadin', key: 'string' }
 * @returns {AddVarAction} Action.
 */
export const addVarAction = (text, key) => ({
  type: 'VAR_ADD',
  text,
  key
})

/**
 * @typedef {object} ResetVarAction
 * @property {string} type - Action type.
 */

/**
 * Reset Var Action.
 *
 * @example
 * resetVarAction() // return { type: 'VAR_RESET' }
 * @returns {AddVarAction} Action.
 */
export const resetVarAction = () => ({
  type: 'VAR_RESET'
})
