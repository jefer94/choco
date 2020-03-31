import locale from '@choco/i18n'

/** @module reducers/tabs */

/**
 * @typedef {object} Tab
 * @property {string} id - Tab React key.
 * @property {string} name - Tab name.
 * @property {string} content - Tab content.
 * @property {string} active - Tab active.
 */

/**
 * Get defaults tabs
 * @example
 * getDefaults()
 * @returns {Tab[]} Array of tabs
 */
function getDefaults() {
  return [{
    id: 0,
    name: locale.one('editor'),
    content: locale.one('code'),
    active: true
  }]
}

/**
 * Set first letter to uppercase.
 *
 * @param {string} string - Tab title.
 * @param {number} id - Tab id.
 * @example
 * title('hey apple!', 0) // return 'Hey apple! 0'
 */
function title(string, id) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)} ${id}`
}

/**
 * Add new tab.
 *
 * @param {Tab[]} state - Data store in reducer.
 * @example
 * add([])
 * @returns {Tab[]} Array of Tabs
 */
function add(state) {
  const id = state.length ? state[state.length - 1].id + 1 : 0
  return state.concat([{
    id,
    name: title(locale.one('algorithmWord'), id),
    content: '',
    active: false
  }])
}

/**
 * Remove a tab by id.
 *
 * @param {Tab[]} state - Data store in reducer.
 * @param {object} action - Action dispathed.
 * @example
 * const state = [{
 *   id: 0,
 *   name: editor,
 *   content: code,
 *   active: true
 * }]
 * const action = {
 *   id: 0,
 *   type: 'DELETE_TAB'
 * }
 * remove(state, action) // return []
 */
function remove(state, action) {
  const [first, ...filter] = state.filter((tab) => tab.id !== action.id)
  const active = { ...first, active: true }
  return [active, ...filter]
}

/**
 * Functional store that mutate state of variables.
 *
 * @param {Tab[]} state - Data store in reducer.
 * @param {object} action - Action dispathed.
 * @example
 * reducer([])
 * @returns {Tab[]} Data store in reducer.
 */
export default function reducer(state = getDefaults(), action) {
  switch (action.type) {
    case 'ADD_TAB':
      return add(state)

    case 'DELETE_TAB':
      return remove(state, action)

    case 'CHANGE_TAB':
      return state.map((tab) => ({
        id: tab.id,
        name: tab.name,
        // content: tab.active ?
        //   action.content :
        //   tab.content,
        content: tab.content,
        active: tab.id === action.id
      }))

    case 'SAVE_TAB':
      return state.map((tab) => ({
        id: tab.id,
        name: tab.name,
        content: tab.id === action.id ?
          action.content :
          tab.content,
        active: tab.active
      }))

    case 'DEFAULTS_TABS':
      return getDefaults()

    default:
      return state
  }
}
