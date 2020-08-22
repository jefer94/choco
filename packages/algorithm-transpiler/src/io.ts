import keychain from '@choco/keychain'
import locale from '@choco/i18n'
import spaces from './spaces'
import { LangError, LangTypeError, JavascriptType, LangVariables } from './lang/common'
import { VectorIO } from './vector'

export const io = {
  show: true,
  text: undefined,
  lastText: undefined,

  reset(): void {
    this.text = undefined
    this.lastText = undefined
    this.show = true
  },

  addText(text: string): void {
    this.lastText = this.text
    this.text = text
  },

  error(): void {
    this.show = false
  }
}

export type IoLine = {
  readonly id: string
  readonly error: boolean
  readonly content: string
  readonly var?: string
}

type ReadResponse = {
  readonly assign: string
  readonly lastLine: IoLine
}

export type IoVariables = {
  readonly [key: string]: JavascriptType
}

export function read(toRead: string, variables: IoVariables, lastLine?: IoLine): ReadResponse {
  let toReadCopy = spaces(toRead)

  // flags
  let isVector = false
  // let newLastLine
  let input

  input = prompt(io.text)
  // if var not exist, not work
  // if (lastLine && lastLine.var) newLastLine = Object.freeze({ ...lastLine, content: input })
  // else newLastLine = Object.freeze({ ...lastLine, var: input })
  const newLastLine = Object.freeze({ ...lastLine, var: input })

  // vector
  if (toReadCopy.search(/\.io\(/) !== -1) {
    isVector = true
    toReadCopy += `.add(${input})`
  }

  // console.log(toReadCopy, typeof toReadCopy)
  else {
    const result = checkVariables(variables[toReadCopy], newLastLine, input)
    if (result) return result
    input = fixInputToBoolean(variables[toReadCopy], input)
  }

  if (variables[toReadCopy] === 'string') return readResponse(`${toReadCopy} = '${input}';`, newLastLine)

  if (isVector) return readResponse(`${toReadCopy};`, newLastLine)

  return readResponse(`${toReadCopy} = ${input};`, newLastLine)
}

function readResponse(assign: string, lastLine: IoLine): ReadResponse {
  // const id = keychain('line')
  return Object.freeze({ assign, lastLine })
}

function checkVariables(type: JavascriptType, newLastLine: IoLine, input: string): ReadResponse |
  undefined {
  const typeError = locale.one<LangTypeError>('typeError')

  switch (type) {
    case 'int':
      if (Number.isNaN(Number(input)) || +input !== Math.trunc(+input)) return readResponse(`write('${typeError.int}'); io.error();`, newLastLine)
      break
    case 'double':
      if (Number.isNaN(Number(input))) return readResponse(`write('${typeError.double}'); io.error();`, newLastLine)
      break
    case 'string':
      break
    case 'bool':
      const number = Number(input)
      if (!Number.isInteger(number) || number < 0 || number > 1) return readResponse(`write('${typeError.bool}'); io.error();`, newLastLine)
      // else input = number === 1 ? 'true' : 'false'
      break
    default:
      return readResponse(`write('${typeError.unknow(type)}'); io.error();`, newLastLine)
  }
}

function fixInputToBoolean(type: string, input: string): string {
  if (type === 'bool') return Number(input) === 1 ? 'true' : 'false'
  return input
}

type WriteInput = string | number | VectorIO<string> | VectorIO<number> | VectorIO<boolean>

/**
 * Print an array of elements.
 *
 * @param args - Array the elements.
 * @returns Write object.
 */
export function write(...args: readonly WriteInput[]): IoLine {
  const error = locale.one<LangError>('error')
  // var
  let result = ''
  let err
  args.forEach((text) => {
    let textCopy = text
    if (typeof textCopy === 'object' && textCopy.isVector && textCopy.isVector()) {
      textCopy = textCopy.show().toString()
    }
    if (typeof textCopy === 'number' && Number.isNaN(textCopy)) {
      err = `write('${error.stringForNumber}'); io.error();`
    }
    if (typeof textCopy === 'number' && !Number.isFinite(textCopy)) {
      err = `write('${error.infinity}'); io.error();`
    }
    result += textCopy
  })

  if (err) {
    return Object.freeze({
      id: keychain('line'),
      error: true,
      content: err
    })
  }
  // io.show is a flag, avoids execution after errors
  if (io.show) {
    // if (io.lastText === result)
    //   io.resetLast()
    io.addText(result)
    return Object.freeze({
      id: keychain('line'),
      error: false,
      content: result
    })
  }
  return Object.freeze({
    id: keychain('line'),
    error: false,
    content: ''
  })
}
