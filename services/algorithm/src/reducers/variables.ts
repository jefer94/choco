import { JavascriptType } from '@chocolab/algorithm-transpiler'
import { ResetVarAction, AddVarAction } from '../actions'

/**
 * Functional store that mutate state of variables.
 * @param state - Data store in reducer.
 * @param action - Action dispathed.
 * @example
 * ```
 * reducer({}, { type: 'VAR_ADD', key: 'senna', text: 'string' }) // return { senna: 'string' }
 * reducer({ senna: 'string' }, { type: 'VAR_RESET' }) // return {}
 * ```
 * @returns Data store in reducer.
 */
export default function reducer(state: Record<string, JavascriptType> = {},
  action: AddVarAction | ResetVarAction): Record<string, JavascriptType> {
  switch (action.type) {
    case 'VAR_ADD':
      return ({ ...state, ...{ [action.key]: action.text } })

    case 'VAR_RESET':
      return {}

    default:
      return state
  }
}
