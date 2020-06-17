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

let tabs
let store

export type VariableStore = {
  readonly varAdd: (value: string, name: string) => void
  readonly varReset: () => void
}

export function setDispatch({ varAdd, varReset }: VariableStore): void {
  store = { varAdd, varReset }
}

export function setTabs(externalTabs): void {
  tabs = externalTabs
}

export function toJS() {
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
