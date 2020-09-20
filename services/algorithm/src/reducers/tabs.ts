import locale from '@chocolab/i18n'

export type Tab = {
  readonly id: string
  readonly name: string
  readonly content: string
  readonly active: boolean
}

export type LazyActions = {
  readonly type: string
  readonly id?: string
  readonly content?: string
}

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

/**
 * Set first letter to uppercase.
 * @param string - Tab title.
 * @param id - Tab id.
 * @example
 * ```
 * title('hey apple!', 0) // return 'Hey apple! 0'
 * ```
 * @returns Set first letter to uppercase.
 */
function title(string, id): string {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)} ${id}`
}

/**
 * Add new tab.
 * @param state - Data store in reducer.
 * @example
 * ```
 * add([])
 * ```
 * @returns Array of Tabs.
 */
function add(state: readonly Tab[]): readonly Tab[] {
  const id = state.length ? +state[state.length - 1].id + 1 : 0
  return state.concat([{
    id: id.toString(),
    name: title(locale.one('algorithmWord'), id),
    content: '',
    active: false
  }])
}

/**
 * Remove a tab by id.
 * @param state - Data store in reducer.
 * @param action - Action dispathed.
 * @example
 * ```
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
 * ```
 * @returns Tabs.
 */
function remove(state: readonly Tab[], action: LazyActions): readonly Tab[] {
  const [first, ...filter] = state.filter((tab) => tab.id !== action.id)
  const active = { ...first, active: true }
  return [active, ...filter]
}

/**
 * Functional store that mutate state of variables.
 * @param state - Data store in reducer.
 * @param action - Action dispathed.
 * @example
 * reducer([])
 * @returns Data store in reducer.
 */
export default function reducer(state = getDefaults(), action: LazyActions): readonly Tab[] {
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
