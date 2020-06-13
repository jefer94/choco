import locale from '@choco/i18n'
import { staticTokens } from './common'

const lang = 'es'

export default function es(): void {
  locale.set(lang, 'algorithmWord', 'algoritmo')
  locale.set(lang, 'begin', 'inicio')
  locale.set(lang, 'end', 'fin')
  locale.set(lang, 'forWord', 'para')
  locale.set(lang, 'toWord', 'hasta')
  locale.set(lang, 'trueWord', 'verdadero')
  locale.set(lang, 'falseWord', 'falso')

  locale.set(lang, 'tokens', { ...staticTokens, ...{
    // algorithm : js
    o: '||',
    y: '&&',
    no: '!'
  }})

  locale.set(lang, 'variables', [
    // map
    'variables',
    'var'
  ])

  locale.set(lang, 'transpiler', {
    // algorithm : js
    si: 'if',
    sino: '}\nelse {',
    mientras: 'while',
    repetir: 'do {',
    hasta: '} while',
    para: 'for',
    // hacer: 'do'
  })

  locale.set(lang, 'openBracket', [
    // map
    'hacer',
    'entonces'
  ])


  locale.set(lang, 'closeBracket', [
    // map
    'finsi',
    'fin_si',
    'finmientras',
    'fin_mientras',
    'finpara',
    'fin_para'
  ])

  locale.set(lang, 'write', [
    // map
    'mostrar',
    'escribir',
    'imprimir'
  ])

  locale.set(lang, 'read', [
    // map
    'leer'
  ])

  locale.set(lang, 'type', {
    // type : algorithm
    int: 'entero',
    double: 'real',
    string: 'carapter',
    bool: 'booleano'
  })

  locale.set(lang, 'typeError', {
    // type : string in es
    int: 'Error: no es entero',
    double: 'Error: no es flotante',
    string: 'Error: no es una cadena',
    bool: 'Error: no es booleano',
    unknow: (type) => `Error: ${type} no es un tipo de variable valido`
  })

  locale.set(lang, 'error', {
    // error name     : string in es
    stringForNumber: 'Error: un numero no puede multiplicar a un carapter',
    infinity: 'Error: dividir entre 0 causa un numero infinito',
    dispatchers: 'Error: No se recibieron dispatchers'
  })

  locale.set(lang, 'code', [
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
  ].join('\n'))
}
