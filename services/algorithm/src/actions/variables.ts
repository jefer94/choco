import { JavascriptType } from '@chocolab/algorithm-transpiler'

export type AddVarAction = {
  readonly type: 'VAR_ADD'
  readonly text: JavascriptType
  readonly key: string
}

/**
 * Add Var Action.
 * @param text - Name of var.
 * @param key - Type of var.
 * @example
 * ```
 * addVarAction('Kassadin', 'string') // return { type: 'VAR_ADD', text: 'Kassadin', key: 'string' }
 * ```
 * @returns Action.
 */
export const addVarAction = (text: JavascriptType, key: string): AddVarAction => ({
  type: 'VAR_ADD',
  text,
  key
})

export type ResetVarAction = {
  readonly type: 'VAR_RESET'
}

/**
 * Reset Var Action.
 * @example
 * ```
 * resetVarAction() // return { type: 'VAR_RESET' }
 * ```
 * @returns Action.
 */
export const resetVarAction = (): ResetVarAction => ({
  type: 'VAR_RESET'
})
