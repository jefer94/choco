import { setLang, algorithmWord, tokens, begin, end, forWord, toWord, trueWord, falseWord, variables, transpiler, openBracket, closeBracket, write, read, type, typeError, error, addTab, removeTab, menu, code } from './i18n'

function genericTokens() {
  expect(tokens['<>']).toBe('!==')
  expect(tokens['<=']).toBe('<=')
  expect(tokens['>=']).toBe('>=')
  expect(tokens['<']).toBe('<')
  expect(tokens['>']).toBe('>')
  expect(tokens['<-']).toBe('=')
}

test('ES algorithmWord', () => {
  setLang('es')
  expect(algorithmWord).toBe('algoritmo')
})

test('ES begin', () => {
  setLang('es')
  expect(begin).toBe('inicio')
})

test('ES end', () => {
  setLang('es')
  expect(end).toBe('fin')
})

test('ES forWord', () => {
  setLang('es')
  expect(forWord).toBe('para')
})

test('ES toWord', () => {
  setLang('es')
  expect(toWord).toBe('hasta')
})

test('ES trueWord', () => {
  setLang('es')
  expect(trueWord).toBe('verdadero')
})

test('ES falseWord', () => {
  setLang('es')
  expect(falseWord).toBe('falso')
})

test('ES tokens', () => {
  setLang('es')
  genericTokens()
  expect(tokens.o).toBe('||')
  expect(tokens.y).toBe('&&')
  expect(tokens.no).toBe('!')
})

test('ES variables', () => {
  setLang('es')
  const [varName1, varName2, ...restOfVarName] = variables
  expect(restOfVarName.length).toBe(0)
  expect(varName1).toBe('variables')
  expect(varName2).toBe('var')
})

test('ES transpiler', () => {
  setLang('es')
  expect(Object.keys(transpiler).length).toBe(7)
  expect(transpiler.si).toBe('if')
  expect(transpiler.sino).toBe('}\nelse {')
  expect(transpiler.mientras).toBe('while')
  expect(transpiler.repetir).toBe('do {')
  expect(transpiler.hasta).toBe('} while')
  expect(transpiler.para).toBe('for')
  expect(transpiler.hacer).toBe('do')
})

test('ES openBracket', () => {
  setLang('es')
  const [bracket1, bracket2, ...restOfBrackets] = openBracket
  expect(restOfBrackets.length).toBe(0)
  expect(bracket1).toBe('hacer')
  expect(bracket2).toBe('entonces')
})

test('ES closeBracket', () => {
  setLang('es')
  const [bracket1, bracket2, bracket3, bracket4, bracket5, bracket6, ...restOfBrackets] = closeBracket
  expect(restOfBrackets.length).toBe(0)
  expect(bracket1).toBe('finsi')
  expect(bracket2).toBe('fin_si')
  expect(bracket3).toBe('finmientras')
  expect(bracket4).toBe('fin_mientras')
  expect(bracket5).toBe('finpara')
  expect(bracket6).toBe('fin_para')
})

test('ES write', () => {
  setLang('es')
  const [write1, write2, write3, ...restOfWriteWords] = write
  expect(restOfWriteWords.length).toBe(0)
  expect(write1).toBe('mostrar')
  expect(write2).toBe('escribir')
  expect(write3).toBe('imprimir')
})

test('ES read', () => {
  setLang('es')
  const [read1, ...restOfReadWords] = read
  expect(restOfReadWords.length).toBe(0)
  expect(read1).toBe('leer')
})

test('ES type', () => {
  setLang('es')
  expect(Object.keys(type).length).toBe(4)
  expect(type.int).toBe('entero')
  expect(type.double).toBe('real')
  expect(type.string).toBe('carapter')
  expect(type.bool).toBe('booleano')
})

test('ES typeError', () => {
  setLang('es')
  expect(Object.keys(typeError).length).toBe(4)
  expect(typeError.int).toBe('ERROR: no es entero')
  expect(typeError.double).toBe('ERROR: no es flotante')
  expect(typeError.string).toBe('ERROR: no es una cadena')
  expect(typeError.bool).toBe('ERROR: no es booleano')
})

test('ES error', () => {
  setLang('es')
  expect(Object.keys(error).length).toBe(2)
  expect(error.stringForNumber).toBe('ERROR: un numero no puede multiplicar a un carapter')
  expect(error.infinity).toBe('ERROR: dividir entre 0 causa un numero infinito')
})

test('ES menu', () => {
  setLang('es')
  expect(menu).toBe('Menu')
})

test('ES addTab', () => {
  setLang('es')
  expect(addTab).toBe('Add tab')
})

test('ES removeTab', () => {
  setLang('es')
  expect(removeTab).toBe('Remove tab')
})

test('ES code', () => {
  setLang('es')
  expect(code).toBe(`algoritmo facilito
variables
numero, i, tabla[10]: entero
inicio
  i <- 0
  mostrar "Ingrese numero a multiplicar: "
  leer numero
  mientras (i < 10) hacer
    i <- i + 1
    tabla[i] <- numero * i
    mostrar numero, " * ", i, " = ", numero * i
  finmientras
fin`)
})
