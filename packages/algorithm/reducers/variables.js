/** @module reducers/variables */

/**
 * Functional store that mutate state of variables.
 *
 * @param {object.<string, string>} state - Data store in reducer.
 * @param {object} action - Action dispathed.
 * @example
 * reducer({}, { type: 'VAR_ADD', key: 'senna', text: 'string' }) // return { senna: 'string' }
 * reducer({ senna: 'string' }, { type: 'VAR_RESET' }) // return {}
 * @returns {object.<string, string>} - Data store in reducer.
 */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'VAR_ADD':
      return ({ ...state, ...{ [action.key]: action.text } })

    case 'VAR_RESET':
      return {}

    default:
      return state
  }
}
