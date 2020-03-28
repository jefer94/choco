import variables from './variables'

const code = `variables
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
fin`

const storeMock = {
  varAdd(type, name) {
    this.store = this.store || {}
    this.store[name] = type
  }
}

test('should transpile variables', () => {
  const vars = variables(code, storeMock)

  expect(typeof vars).toBe('string')

  const [line1, line2, line3, ...restOfLines] = vars.split('\n')

  expect(restOfLines.length).toBe(0)
  expect(line1).toBe('var numero;')
  expect(line2).toBe('var i;')
  expect(line3).toBe('var tabla = new Vector(10);')
})

test('get vars', () => {
  variables(code, storeMock)

  const { numero, i, tabla, ...restOfVars } = storeMock.store

  expect(Object.keys(restOfVars).length).toBe(0)
  expect(numero).toBe('int')
  expect(i).toBe('int')
  expect(tabla).toBe('int')
})
