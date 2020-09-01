import files from './files'
import vars from './variables'
import diffAlg from './diff'
import transform from './transform'

// function joinCodes(tabs) {
//   return tabs
//     .reverse()
//     .map((value) => value.content)
//     .join()
// }

type Tab = {
  readonly id: number
  readonly name: string
  readonly content: string
  readonly active: boolean
}

let tabs: readonly Tab[]
let store: VariableStore

export type VariableStore = {
  readonly varAdd: (value: string, name: string) => void
  readonly varReset: () => void
}

export function setDispatch({ varAdd, varReset }: VariableStore): void {
  store = { varAdd, varReset }
}

export function setTabs(externalTabs: readonly Tab[]): void {
  tabs = externalTabs
}

type ToJS = {
  readonly title: string
  readonly literals: string
  readonly code: string
  readonly diff: number
  readonly map: readonly string[]
}

export function toJS(): ToJS {
  store.varReset()

  // and execute a interpreter
  // const codesInString = joinCodes(tabs)
  const codesInString = tabs[0].content
  const [title, codeFromTitle] = files(codesInString)
  const literals = vars(codeFromTitle, store)
  const diff = diffAlg(codesInString, literals)
  const map = tabs.map((v) => v.content)

  // show the output
  const code = transform(codeFromTitle)
  return {
    title,
    literals,
    code,
    diff,
    map
  }
}
