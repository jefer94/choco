import locale from '@choco/i18n'
import { read, write, io, IoVariables, IoLine } from './io'
import { algorithmTranspilerLang } from './lang'
import { Vector } from './vector'

algorithmTranspilerLang()
locale.setLang('en')

let id = -1
const type: IoVariables = Object.freeze({
  int: 'int',
  double: 'double',
  string: 'string',
  bool: 'bool'
})

function manualKeychain(): string {
  id += 1
  return `line_${id}`
}

test('io default', () => {
  expect(io.reset()).toBeUndefined()
  expect(Object.keys(io)).toHaveLength(6)
  expect(io.show).toBeTruthy()
  expect(io.text).toBeUndefined()
  expect(io.lastText).toBeUndefined()
})

test('io add text', () => {
  const texts = [{
    show: true,
    text: 'Text1',
    lastText: undefined
  }, {
    show: true,
    text: 'Text2',
    lastText: 'Text1'
  }]

  expect(io.reset()).toBeUndefined()

  texts.forEach((v) => {
    expect(Object.keys(io)).toHaveLength(6)
    expect(io.addText(v.text))
    expect(io.show).toBeTruthy()
    expect(io.text).toBe(v.text)
    expect(io.lastText).toBe(v.lastText)
  })
})

test('io error', () => {
  expect(io.reset()).toBeUndefined()
  expect(io.error()).toBeUndefined()

  expect(Object.keys(io)).toHaveLength(6)
  expect(io.show).toBeFalsy()
  expect(io.text).toBeUndefined()
  expect(io.lastText).toBeUndefined()
})

test('io reset', () => {
  io.show = false
  io.text = 'Jax'
  io.lastText = 'Kassadin'

  expect(io.reset()).toBeUndefined()
  expect(Object.keys(io)).toHaveLength(6)
  expect(io.show).toBeTruthy()
  expect(io.text).toBeUndefined()
  expect(io.lastText).toBeUndefined()
})

test('write lines', () => {
  [1, 2, 3].forEach((v) => {
    const line = `line ${v}: `
    const { id, error, content, ...restOfProperties } = write(line)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(id).toBe(manualKeychain())
    expect(error).toBeFalsy()
    expect(content).toBe(line)
  })
})

test('write n args', () => {
  const { id, error, content } = write('0', 1, '2', 3, '4', 5, '6', 7, '8', 9)
  expect(id).toBe(manualKeychain())
  expect(error).toBeFalsy()
  expect(content).toBe('0123456789')
})

test('get error with NaN', () => {
  const { id, error, content } = write(NaN)
  expect(id).toBe(manualKeychain())
  expect(error).toBeTruthy()
  expect(content).toBe('write(\'Error: dividing by 0 causes an infinite number\'); io.error();')
})

test('io error is true', () => {
  io.error()
  const { id, error, content } = write('value')
  expect(id).toBe(manualKeychain())
  expect(error).toBeFalsy()
  expect(content).toBe('')
  io.reset()
})

test('write Vector', () => {
  const list = new Vector<number>(10)
  const testElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  testElements.forEach((v) => {
    list.io(v).add(v)
    const { id, error, content } = write(list.io(v))
    expect(id).toBe(manualKeychain())
    expect(error).toBeFalsy()
    expect(content).toBe(v.toString())
  })
})

test('read var', () => {
  const vars: IoVariables = {
    senna: type.int,
    tristana: type.string,
    sona: type.double,
    jhin: type.bool,
    vi: type.bool
  }
  const res = {
    senna: 'int',
    tristana: 'string',
    sona: 'double',
    jhin: 'bool',
    vi: 'bool'
  }

  Object.keys(vars).forEach((k) => {
    const promptInput = res[k] === 'true' ? '1' : res[k] === 'false' ? '0' : res[k]
    window.prompt = jest.fn(() => promptInput)
    const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
    console.log(vars, 'vars')
    const { assign, lastLine, ...restOfProperties } = read(k, vars)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(assign).toBe(`${k} = ${testAssignValue};`)
    expect(lastLine).toBeTruthy()
    expect(Object.keys(lastLine)).toHaveLength(1)
    expect(lastLine.var).toBe(promptInput)
  })
})

test('read vector', () => {
  const vars = {
    list: type.int
  }

  window.prompt = jest.fn(() => '1')
  // const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
  const { assign, lastLine, ...restOfProperties } = read('list.io(1)', vars)
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(assign).toBe('list.io(1).add(1);')
  expect(lastLine).toBeTruthy()
  expect(Object.keys(lastLine)).toHaveLength(1)
  expect(lastLine.var).toBe('1')
})

test('read number throw if pass string', () => {
  const vars = {
    v: type.int
  }

  window.prompt = jest.fn(() => 'error')
  // const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
  const { assign, lastLine, ...restOfProperties } = read('v', vars)
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(assign).toBe('write(\'Error: don\'t is integer\'); io.error();')
  expect(lastLine).toBeTruthy()
  expect(Object.keys(lastLine)).toHaveLength(1)
  expect(lastLine.var).toBe('error')
})

test('read float throw if pass string', () => {
  const vars = {
    v: type.double
  }

  window.prompt = jest.fn(() => 'error')
  // const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
  const { assign, lastLine, ...restOfProperties } = read('v', vars)
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(assign).toBe('write(\'Error: don\'t is float\'); io.error();')
  expect(lastLine).toBeTruthy()
  expect(Object.keys(lastLine)).toHaveLength(1)
  expect(lastLine.var).toBe('error')
})


test('read bool throw if not pass 0 or 1', () => {
  const list = [2, 'y']
  const vars = {
    v: type.bool
  }
  list.forEach((v) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.prompt = jest.fn(() => v)
    // const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
    const { assign, lastLine, ...restOfProperties } = read('v', vars)
    expect(Object.keys(restOfProperties)).toHaveLength(0)
    expect(assign).toBe('write(\'Error: don\'t is boolean\'); io.error();')
    expect(lastLine).toBeTruthy()
    expect(Object.keys(lastLine)).toHaveLength(1)
    expect(lastLine.var).toBe(v)
  })
})

test('read bad type', () => {
  const vars = {
    v: 'potato'
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.prompt = jest.fn(() => 'v')
  // const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
  // ignore bad type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { assign, lastLine, ...restOfProperties } = read('v', vars)
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(assign).toBe('write(\'Error: potato is not a valid variable type\'); io.error();')
  expect(lastLine).toBeTruthy()
  expect(Object.keys(lastLine)).toHaveLength(1)
  expect(lastLine.var).toBe('v')
})

test('read var, with lastLine', () => {
  const last: IoLine = { content: 'Last line', error: false, id: 'first' }
  const vars = {
    tristana: type.string
  }

  window.prompt = jest.fn(() => 'v')
  const { assign, lastLine, ...restOfProperties } = read('tristana', vars, last)
  expect(Object.keys(restOfProperties)).toHaveLength(0)
  expect(assign).toBe('tristana = \'v\';')
  expect(lastLine).toBeTruthy()
  expect(lastLine).toEqual({ ...last, var: 'v' })
  // expect(Object.keys(lastLine.lastLine)).toHaveLength(0)
  expect(lastLine.content).toBe('Last line')
  expect(lastLine.var).toBe('v')
})