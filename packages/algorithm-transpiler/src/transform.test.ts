import transform, { forLoopCondition, doWhileLoopCondition, stripCode, ifIsEqual, purgeLine, vectorAdd, parser, parseIO } from './transform'
import locale from '@choco/i18n'

locale.setLang('es')

test('for loop condition', () => {
  const code = [
    'para (i = 1 hasta i = 9) hacer',
    '  mostrar i',
    'finpara'
  ].join('\n')
  const res = forLoopCondition(code).split('\n')
  expect(res).toEqual([
    'para (i = 1 ; i <= 9; i++) hacer',
    '  mostrar i',
    'finpara'
  ])
})

test('for loop condition reversed', () => {
  const code = [
    'para (i = 9 hasta i = 1 reversed) hacer',
    '  mostrar i',
    'finpara'
  ].join('\n')
  const res = forLoopCondition(code).split('\n')
  expect(res).toEqual([
    'para (i = 9 ; i >= 1; i--) hacer',
    '  mostrar i',
    'finpara'
  ])
})

test('do while loop condition', () => {
  const code = [
    'repetir',
    '  mostrar i',
    'hasta (1 = 1)'
  ].join('\n')
  const res = doWhileLoopCondition(code).split('\n')
  expect(res).toEqual([
    'repetir',
    '  mostrar i',
    'hasta (!(1 === 1))'
  ])
  expect(doWhileLoopCondition('lobster')).toEqual('lobster')
})

test('strip code', () => {
  const code = [
    'lalala1',
    'lalala2',
    'inicio',
    '   x',
    'fin'
  ].join('\n')
  const res = stripCode(code)
  expect(res).toEqual([
    '   x'
  ])
})

test('if is equal', () => {
  const code = [
    'si (text = \'Not text\') hacer'
  ]
  const res = ifIsEqual(code)
  expect(res).toEqual([
    'si (text === \'Not text\') hacer'
  ])
})

test('purge line', () => {
  expect(purgeLine('( ... )')).toEqual(' ( ... ) ')
  expect(purgeLine('tree[1]')).toEqual('tree.io(1)')
  expect(purgeLine('hey             apple')).toEqual('hey apple')
})

test('vector add', () => {
  expect(vectorAdd('stuff.io(7) <- 9')).toEqual('stuff.io(7).add(9)')
})

test('parser', () => {
  expect(parser(['para'], '')).toBe('for ')
  expect(parser(['hacer'], '')).toBe('{ ')
  expect(parser(['finsi'], '')).toBe('}')
  expect(parser(['<-'], '')).toBe('= ')
  expect(parser(['potato'], '')).toBe('potato ')
})

test('IO parser', () => {
  expect(parseIO(['leer'], 'leer potato')).toBe('eval(read(" potato"));\n')
  expect(parseIO(['imprimir'], 'imprimir potato')).toBe('eval(write( potato));\n')
  expect(parseIO(['potato'], 'potato')).toBe('potato;\n')
})

test('transform', () => {
  const code = [
    'algoritmo facilito',
    'variables',
    'numero, i, tabla[10]: entero',
    'inicio',
    '  i <- 0',
    '  mostrar "Ingrese numero a multiplicar: "',
    '  leer numero',
    '  mientras (i < 10) hacer',
    '    i <- i + 1',
    '    tabla[i] <- numero * i',
    '    mostrar numero, " * ", i, " = ", numero * i',
    '  finmientras',
    'fin'
  ].join('\n')
  expect(transform(code)).toBe('')
})
