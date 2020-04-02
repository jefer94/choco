import keychain from '@choco/keychain'
import locale from '@choco/i18n'

/** @module @choco/algorithm-transpiler/io */

export const io = {
  show: true,

  reset() {
    this.text = undefined
    this.lastText = undefined
    this.show = true
  },

  addText(text) {
    this.lastText = this.text
    this.text = text
  },

  error() {
    this.show = false
  }
}

export function read(toRead, variables, lastLine) {
  const { typeError } = locale.all()
  let toReadCopy = toRead

  // flags
  let isVector = false
  let newLastLine

  // clean up unnecessary signs
  while (toReadCopy.substr(0, 1) === ' ') {
    const length = toReadCopy.length - 1
    toReadCopy = toReadCopy.substr(1, length)
  }
  while (toReadCopy.substr(toReadCopy.length - 1, 1) === ' ') toReadCopy = toReadCopy.substr(0, toReadCopy.length - 1)
  let input

  if (io.text && io.text !== io.lastRext) input = prompt(io.text)
  else input = prompt('')
  // if var not exist, not work
  if (lastLine && lastLine.var) newLastLine = Object.freeze({ ...lastLine, content: input })
  else newLastLine = Object.freeze({ ...lastLine, var: input })

  if (typeof toReadCopy === 'object') return readResponse(`${toReadCopy} = ${input};`, newLastLine)
  // vector
  if (toReadCopy.search(/\.io\(/) !== -1) {
    isVector = true
    toReadCopy += `.add(${input})`
  }
  // here in runtime show the mistakes in assignings
  switch (variables[toReadCopy]) {
    case 'int':
      if (Number.isNaN(Number(input)) || +input !== Math.trunc(input)) return readResponse(`write('${typeError.int}'); io.error();`, newLastLine)
      break
    case 'double':
      if (Number.isNaN(Number(input))) return readResponse(`write('${typeError.double}'); io.error();`, newLastLine)
      break
    case 'string':
      break
    case 'bool':
      try {
        if (typeof JSON.parse(input) !== 'boolean') return readResponse(`write('${typeError.bool}'); io.error();`, newLastLine)
      }
      catch(e) {
        return readResponse(`write('${typeError.bool}'); io.error();`, newLastLine)
      }
      break
    default:
      throw new Error('Unknow var type')
  }

  if (variables[toReadCopy] === 'string') return readResponse(`${toReadCopy} = '${input}';`, newLastLine)

  if (isVector) return readResponse(`${toReadCopy};`, newLastLine)

  return readResponse(`${toReadCopy} = ${input};`, newLastLine)
}

function readResponse(assign, lastLine) {
  // const id = keychain('line')
  return Object.freeze({ assign, lastLine })
}

export function write(...args) {
  const { error } = locale.all()
  // var
  let result = ''
  let err
  Object.values(args).forEach((text) => {
    let textCopy = text
    if (typeof textCopy === 'object' && textCopy.isVector && textCopy.isVector()) textCopy = textCopy.show()

    if (typeof textCopy === 'number' && Number.isNaN(textCopy)) err = `write('${error.stringForNumber}'); io.error();`
    if (typeof textCopy === 'number' && !Number.isFinite(textCopy)) err = `write('${error.infinity}'); io.error();`
    result += textCopy
  })

  if (err) return Object.freeze({
    id: keychain('line'),
    error: true,
    content: err
  })
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
