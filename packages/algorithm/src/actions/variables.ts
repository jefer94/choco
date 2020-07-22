/**
 * @typedef {object} AddVarAction
 * @property {string} type - Action type.
 * @property {string} text - Action text.
 * @property {string} key - Action key.
 */

export type AddVarAction = {
  readonly type: 'VAR_ADD'
  readonly text: string
  readonly key: string
}

/**
 * Add Var Action.
 *
 * @param {string} text - Name of var.
 * @param {string} key - Type of var.
 * @example
 * addVarAction('Kassadin', 'string') // return { type: 'VAR_ADD', text: 'Kassadin', key: 'string' }
 * @returns {AddVarAction} Action.
 */
export const addVarAction = (text: string, key: string): AddVarAction => ({
  type: 'VAR_ADD',
  text,
  key
})

/**
 * @typedef {object} ResetVarAction
 * @property {string} type - Action type.
 */

export type ResetVarAction = {
  readonly type: 'VAR_RESET'
}

/**
 * Reset Var Action.
 *
 * @example
 * resetVarAction() // return { type: 'VAR_RESET' }
 * @returns {AddVarAction} Action.
 */
export const resetVarAction = (): ResetVarAction => ({
  type: 'VAR_RESET'
})
