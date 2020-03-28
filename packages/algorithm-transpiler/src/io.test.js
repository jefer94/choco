import { read, write, io } from './io'
// import { type } from '../i18n'

let id = -1
const type = Object.freeze({
  int: 'int',
  double: 'double',
  string: 'string',
  bool: 'bool'
})

function manualKeychain() {
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
  // const line = 'line 4: '
  // // console.log('aaa',  write('0', 1, '2', 3, '4', 5, '6', 7, '8', 9))
  // const { id, error, content } = write('0', 1, '2', 3, '4', 5, '6', 7, '8', 9)
  // expect(id).toBe(manualKeychain())
  // expect(error).toBeFalsy()
  // expect(content).toBe(line)
})


// test('read var', () => {
//   const vars = {
//     senna: type.int,
//     tristana: type.string,
//     sona: type.double,
//     jhin: type.bool
//   }
//   const res = {
//     senna: '1',
//     tristana: 'hey apple',
//     sona: '1.0',
//     jhin: 'true'
//   }

//   Object.keys(vars).forEach((k) => {
//     window.prompt = jest.fn(() => res[k])
//     const testAssignValue = vars[k] === type.string ? `'${res[k]}'` : res[k]
//     const { assign, lastLine, ...restOfProperties } = read(k, vars)
//     expect(Object.keys(restOfProperties)).toHaveLength(0)
//     expect(assign).toBe(`${k} = ${testAssignValue};`)
//   })
// })
