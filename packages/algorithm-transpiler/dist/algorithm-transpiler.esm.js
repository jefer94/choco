import locale from '@choco/i18n';
import keychain from '@choco/keychain';

const staticTokens = {
  // algorithm : js
  '<>': '!==',
  '<=': '<=',
  '>=': '>=',
  '<': '<',
  '>': '>',
  '<-': '='
};

const lang = 'en';
function en () {
  locale.set(lang, 'algorithmWord', 'algoritmo');
  locale.set(lang, 'begin', 'inicio');
  locale.set(lang, 'end', 'fin');
  locale.set(lang, 'forWord', 'para');
  locale.set(lang, 'toWord', 'hasta');
  locale.set(lang, 'trueWord', 'verdadero');
  locale.set(lang, 'falseWord', 'falso');
  locale.set(lang, 'tokens', { ...staticTokens,
    ...{
      // algorithm : js
      o: '||',
      y: '&&',
      no: '!'
    }
  });
  locale.set(lang, 'variables', [// map
  'variables', 'var']);
  locale.set(lang, 'transpiler', {
    // algorithm : js
    si: 'if',
    sino: '}\nelse {',
    mientras: 'while',
    repetir: 'do {',
    hasta: '} while',
    para: 'for',
    hacer: 'do'
  });
  locale.set(lang, 'openBracket', [// map
  'hacer', 'entonces']);
  locale.set(lang, 'closeBracket', [// map
  'finsi', 'fin_si', 'finmientras', 'fin_mientras', 'finpara', 'fin_para']);
  locale.set(lang, 'write', [// map
  'mostrar', 'escribir', 'imprimir']);
  locale.set(lang, 'read', [// map
  'leer']);
  locale.set(lang, 'type', {
    // type : algorithm
    int: 'entero',
    double: 'real',
    string: 'carapter',
    bool: 'booleano'
  });
  locale.set(lang, 'typeError', {
    // type : string in es
    int: 'ERROR: no es entero',
    double: 'ERROR: no es flotante',
    string: 'ERROR: no es una cadena',
    bool: 'ERROR: no es booleano'
  });
  locale.set(lang, 'error', {
    // error name     : string in es
    stringForNumber: 'ERROR: un numero no puede multiplicar a un carapter',
    infinity: 'ERROR: dividir entre 0 causa un numero infinito'
  });
  locale.set(lang, 'code', ['algoritmo facilito', 'variables', 'numero, i, tabla[10]: entero', 'inicio', '  i <- 0', '  mostrar "Ingrese numero a multiplicar: "', '  leer numero', '  mientras (i < 10) hacer', '    i <- i + 1', '    tabla[i] <- numero * i', '    mostrar numero, " * ", i, " = ", numero * i', '  finmientras', 'fin'].join('\n'));
}

const lang$1 = 'es';
function es () {
  locale.set(lang$1, 'algorithmWord', 'algoritmo');
  locale.set(lang$1, 'begin', 'inicio');
  locale.set(lang$1, 'end', 'fin');
  locale.set(lang$1, 'forWord', 'para');
  locale.set(lang$1, 'toWord', 'hasta');
  locale.set(lang$1, 'trueWord', 'verdadero');
  locale.set(lang$1, 'falseWord', 'falso');
  locale.set(lang$1, 'tokens', { ...staticTokens,
    ...{
      // algorithm : js
      o: '||',
      y: '&&',
      no: '!'
    }
  });
  locale.set(lang$1, 'variables', [// map
  'variables', 'var']);
  locale.set(lang$1, 'transpiler', {
    // algorithm : js
    si: 'if',
    sino: '}\nelse {',
    mientras: 'while',
    repetir: 'do {',
    hasta: '} while',
    para: 'for',
    hacer: 'do'
  });
  locale.set(lang$1, 'openBracket', [// map
  'hacer', 'entonces']);
  locale.set(lang$1, 'closeBracket', [// map
  'finsi', 'fin_si', 'finmientras', 'fin_mientras', 'finpara', 'fin_para']);
  locale.set(lang$1, 'write', [// map
  'mostrar', 'escribir', 'imprimir']);
  locale.set(lang$1, 'read', [// map
  'leer']);
  locale.set(lang$1, 'type', {
    // type : algorithm
    int: 'entero',
    double: 'real',
    string: 'carapter',
    bool: 'booleano'
  });
  locale.set(lang$1, 'typeError', {
    // type : string in es
    int: 'ERROR: no es entero',
    double: 'ERROR: no es flotante',
    string: 'ERROR: no es una cadena',
    bool: 'ERROR: no es booleano'
  });
  locale.set(lang$1, 'error', {
    // error name     : string in es
    stringForNumber: 'ERROR: un numero no puede multiplicar a un carapter',
    infinity: 'ERROR: dividir entre 0 causa un numero infinito'
  });
  locale.set(lang$1, 'code', ['algoritmo facilito', 'variables', 'numero, i, tabla[10]: entero', 'inicio', '  i <- 0', '  mostrar "Ingrese numero a multiplicar: "', '  leer numero', '  mientras (i < 10) hacer', '    i <- i + 1', '    tabla[i] <- numero * i', '    mostrar numero, " * ", i, " = ", numero * i', '  finmientras', 'fin'].join('\n'));
}

function algorithmTranspilerLang() {
  en();
  es();
} // export default algorithmTranspilerLang

/** @module libs/algorithm/files */

/**
 * @typedef {object} Files
 * @param {string} code - Algorithm lines.
 */

/**
 * Get name of algorithm.
 * @param {string} code - Algorithm lines
 * @returns {Files} Algorithm name and lines but first line
 * return
 */

function files (code) {
  const {
    algorithmWord
  } = locale.all();
  const [firstLine, ...lines] = code.split('\n');
  const [keyword, name, ...restOfWords] = firstLine.split(' ');
  if (keyword === algorithmWord && name && restOfWords.length === 0) return [name, lines.join('\n')];
  throw new Error('name is invalid');
}

/** @module @choco/algorithm-transpiler/variables */

/**
 * Transform Algorithm variables in Javascript variables.
 *
 * @param {string} code - Algorithm code.
 * @param {object} store - Store of variables.
 * @example
 * import variables from 'libs/algorithm/variables'
 *
 * const store = {}
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  stuff: string',
 *   'start'.
 *   '  ...'.
 *   'end'
 * ]
 * variables(code, store) // return 'var stuff;\n'
 * @returns {string} Javascript variables.
 */

function vars (code, store) {
  const literals = ignoreSentences(code);
  const [firstLine, ...lines] = literals.split('\n');
  const [keyword, ...restOfVarLine] = firstLine.split(' ');
  let result = '';
  if (isVarsZone(keyword, restOfVarLine)) Object.keys(lines).map(Number).forEach(key => {
    const words = lines[key].split(' '); // const i = key + 1

    if (lines[key].search('//') !== -1) {
      const remove = lines[key].substr(lines[key].search('//'), lines[key].length);
      lines[key] = lines[key].replace(remove, '');
    }

    Object.keys(words).map(Number).forEach(j => {
      if (j < words.length - 1) {
        const word = prepareWord(words[j]);
        if (word) result += `var ${word};\n`;
        if (j !== words.length - 1) reserveVars(store, words[words.length - 1], purgeVarName(words[j]));
      }
    });
  });
  return result.split('\n').filter(v => v).join('\n');
}
/**
 * Is this line the beginning of the variable area?.
 *
 * @param {string} keyword - First word of line.
 * @param {string[]} restOfVarLine - Rest of words.
 * @example
 * // libs/i18n/variables = ['variables']
 * isVarsZone('variables', []) // return true
 * isVarsZone('variables', ['', '', '', '']) // return true
 * isVarsZone('Another', []) // return false
 * @see libs/i18n/variables
 * @returns {boolean} Is this line the beginning of the variable area?.
 */

function isVarsZone(keyword, restOfVarLine) {
  const {
    variables
  } = locale.all();
  return variables.indexOf(keyword) !== -1 && (!restOfVarLine.length || restOfVarLine.every(v => !v));
}
/**
 * Purge variable name of tokens.
 *
 * @param {string} word - Algorithm variable with token.
 * @todo Understand purgeVarName('=') use.
 * @example
 * purgeVarName('=') // return ' = '
 * purgeVarName(' ') // return ''
 * purgeVarName('\t') // return ''
 * purgeVarName(',') // return ''
 * purgeVarName(':') // return ''
 * purgeVarName('array[10]') // return 'array'
 * @returns {string} Javascript variable without token.
 */


function purgeVarName(word) {
  return word.replace(/=/g, ' = ').replace(/ /g, '').replace(/\t/g, '').replace(/,/g, '').replace(/:/g, '').replace(/\[[0-9]{1,9}\]/g, '');
}
/**
 * Transform in var section, Algorithm equal, assign type, extra spaces or tabs, separators and
 * vectors to Javascript.
 *
 * @param {string} word - A Algorithm word.
 * @example
 * prepareWord('=') // return ' = '
 * prepareWord(' ') // return ''
 * prepareWord('\t') // return ''
 * prepareWord(',') // return ''
 * prepareWord(':') // return ''
 * prepareWord('array[10]') // return 'array = new Vector(10)'
 * @returns {string} A Javacript word.
 */


function prepareWord(word) {
  return word.replace(/=/g, ' = ').replace(/ /g, '').replace(/\t/g, '').replace(/,/g, '').replace(/:/g, '').replace(/\[/g, ' = new Vector(').replace(/\]/g, ')');
}
/**
 * Reserve vars in the store.
 *
 * @param {object} store - Store of variables.
 * @param {string} isA - Variable type.
 * @param {string} word - Variable name.
 * @example
 * const store = {}
 * reserveVars(store, 'int', 'potato')
 * reserveVars(store, 'double', 'heyApple')
 * reserveVars(store, 'string', 'adc')
 * reserveVars(store, 'bool', 'mid')
 * // store {
 * //   potato: 'int',
 * //   heyApple: 'double',
 * //   adc: 'string',
 * //   mid: 'bool'
 * // }
 */


function reserveVars(store, isA, word) {
  const {
    type
  } = locale.all();
  if (store && store.varAdd) switch (isA) {
    case type.int:
      store.varAdd('int', word);
      break;

    case type.double:
      store.varAdd('double', word);
      break;

    case type.string:
      store.varAdd('string', word);
      break;

    case type.bool:
      store.varAdd('bool', word);
      break;
  }
}
/**
 * Ignore algorithm body.
 *
 * @param {string} code - Algorithm code.
 * @example
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  easy: boolean',
 *   'start',
 *   '   ...',
 *   'end'
 * ].join('\n')
 * ignoreSentences(code) // return the same code but start ... end block
 * @returns {string} Get the code, less the body (start ... end).
 */


function ignoreSentences(code) {
  const {
    begin,
    end
  } = locale.all();
  return code.replace(code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))[0], '');
}

/** @module @choco/algorithm-transpiler/diff */

/**
 * Diff between Algorithm code and Javascript code.
 *
 * @param {*} code - Algorithm code.
 * @param {*} js - Current Javascript code.
 * @example
 * alg = [
 *   'variables',
 *   '  bestAdc: string'
 * ].join('\n')
 * js = 'var bestAdc'
 * diff(alg, js) // return 1
 * @returns {number} Diff between codes.
 */

function diffAlg (code, js) {
  const {
    begin
  } = locale.all();
  const alg = code.split(/\n/);
  let beginIndex = 1;

  while (alg[beginIndex].match(RegExp(begin)) === null) beginIndex++;

  beginIndex++;
  const localJS = js.split(/\n/);
  let jsIndex = 0;

  while (/var/.test(localJS[jsIndex])) jsIndex++;

  return beginIndex - jsIndex;
}

/** @module libs/algorithm/transform */
// transform between native languaje and javascipt

function transform (code) {
  const {
    tokens,
    transpiler,
    openBracket,
    closeBracket,
    write,
    read
  } = locale.all();
  let line = stripCode(code);
  let js = ''; // now the transpiler work

  Object.keys(line).map(Number).forEach(i => {
    // ...
    line[i] = purgeComment(line[i]);
    line[i] = purgeLine(line[i]); // vector.io(n).add(value)

    line[i] = vectorAdd(line[i]);

    if (line[i].substr(0, 1) === ' ') {
      const length = line[i].length - 1;
      line[i] = line[i].substr(1, length);
    }

    const length = line[i].length - 1;

    while (line[i].substr(length, 1) === ' ') line[i] = line[i].substr(0, length);

    if (line[i] === '') return; // if (x === y)

    line = ifIsEqual(line); // for (...)

    line[i] = forLoopCondition(line[i]); // do ... while (!...)

    line[i] = doWhileLoopCondition(line[i]); // each word is separated into a array

    const word = line[i].split(' '); // this loop is to search in various dictionaries, and transform that code

    Object.keys(word).map(Number).forEach(key => {
      // word[key] = word[key].replace(/=/g, ' === ')
      // dictionaries of words
      // open blackets
      if (openBracket.indexOf(word[key]) !== -1) js += '{ '; // close brackets
      else if (closeBracket.indexOf(word[key]) !== -1) js += '}';else if (transpiler[word[key]]) js += `${transpiler[word[key]]} `; // dictionaries of tokens
        else if (tokens[word[key]]) js += `${tokens[word[key]]} `; // and words not in the dictionary
          else js += `${word[key]} `;
    }); // console.log('js', js)
    // this fracment of code delete all space in the start of a line
    // with a style like stack, first reverse the array

    word.reverse(); // then in spaceInStart assign the last element in the stack

    let spaceInStart = word.pop();
    const ifNoHaveSpaceInStart = spaceInStart; // while it is equal at ""
    // assign at spaceInStart the last element in the stack

    while (spaceInStart === '') spaceInStart = word.pop(); // the last element never is ""


    if (typeof spaceInStart === 'undefined') word.push(ifNoHaveSpaceInStart);else word.push(spaceInStart); // and reverse the array again to finish

    word.reverse();
    const lastLine = js.split('\n')[js.split('\n').length - 1];
    if (lastLine.search('{') !== -1 || lastLine.search('}') !== -1) js += '\n';else if (write.indexOf(word[0]) !== -1) {
      js = js.replace(write[write.indexOf(word[0])], 'eval(write(');
      js += '));\n';
    } else if (read.indexOf(word[0]) !== -1) {
      js = js.replace(read[read.indexOf(word[0])], 'eval(read("');
      js += '"));\n';
    } else js += ';\n';
  });
  return js;
}
function forLoopCondition(lineArg) {
  const {
    toWord
  } = locale.all(); // for (...)

  let line = lineArg;
  const matchCondition = line.match(RegExp(`([\\s\\S]+${toWord}[\\s\\S]+)`));

  if (matchCondition) {
    let [conditionsFor] = matchCondition;
    conditionsFor = conditionsFor.split(toWord);
    const ref = matchCondition[0].split(toWord);
    conditionsFor[0] += ';';
    conditionsFor[1] = conditionsFor[1].replace('=', '<=');
    if (conditionsFor[1].search('reversed') === -1) conditionsFor[1] = conditionsFor[1].replace(')', '; i++)');else conditionsFor[1] = conditionsFor[1].replace(')', '; i--)');
    line = line.replace(ref[0], conditionsFor[0]);
    line = line.replace(ref[1], conditionsFor[1]);
    line = line.replace(toWord, '');
  }

  return line;
}
function doWhileLoopCondition(line) {
  const {
    toWord
  } = locale.all(); // do ... while (!...)

  if (line.match(RegExp(`${toWord}\\s+([\\s\\S]+)`))) return line.replace('(', '(!(').replace(/\)\s{0,}$/, '))').replace(/=/g, '===');
  return line;
}
/**
 * Add assignment in Vector.
 *
 * @param {string} lineArg - Line of code.
 * @example
 * vectorAdd('stuff.io(7) <- 9') // return 'stuff.io(7).add(9)'
 * @returns {string} Line of code.
 */

function vectorAdd(lineArg) {
  let line = lineArg; // vector.io(n).add(value)

  while (line.match(/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/)) {
    line = line.replace(/<-/, '');
    const exp = line.match(/\S+/g);
    line = `${exp[0]}.add(`;
    if (Number.isNaN(+exp[1])) line += `"${exp[1]}"`;else line += exp[1];
    line += ')';
  }

  return line;
}
/**
 * Add space to prevent bad transpile, and transform array to class Vector.
 *
 * @param {string} line - Line of code.
 * @example
 * purgeLine('function stuff()do') // return 'function stuff () do'
 * purgeLine('array[13]') // return 'array.io(13)'
 * @returns {string} Line of code
 */

function purgeLine(line) {
  return line.replace(/\(/g, ' (').replace(/\)/g, ') ').replace(/ {2}/g, ' ').replace(/\[/g, '.io(').replace(/\]/g, ')');
}
/**
 * Purge comments of code.
 *
 * @param {string} lineArg - Line of code.
 * @example
 * purgeComment('for (bestADC === \'Tristana\') do // some stuff')
 * // return 'for (bestADC === \'Tristana\') do '
 * @returns {string} Line of code.
 */

function purgeComment(lineArg) {
  // ...
  let line = lineArg;

  if (line.search('//') !== -1) {
    const remove = line.substr(line.search('//'), line.length);
    line = line.replace(remove, '');
  }

  return line;
}
function stripCode(codeArg) {
  const {
    begin,
    end
  } = locale.all(); // good in this space we are going to make a separation between the code
  // and the variables

  const [code] = codeArg.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm')); // each line is separated into a array

  const lines = code.split('\n'); // the word "fin" is deleted

  if (lines[lines.length - 1].search(end) !== -1) lines.pop(); // reverse the line of array

  lines.reverse(); // the word "inicio" is deleted

  if (lines[lines.length - 1].search(begin) !== -1) lines.pop(); // reverse the line of array

  lines.reverse();
  return lines;
}
/**
 * Parse equal token from Algorithm to Javascript.
 *
 * @param {string[]} linesArg - Line of code.
 * @example
 * ifIsEqual(['for (text = \'Not text\') do'])
 * // return ['for (text === \'Not text\') do']
 * @returns {string[]} Lines of code.
 */

function ifIsEqual(linesArg) {
  const {
    openBracket
  } = locale.all(); // if (x === y)

  const lines = linesArg;
  Object.keys(lines).map(Number).forEach(key => {
    if (lines[key].match(RegExp(`=(.)+${openBracket[key]}`))) lines[key] = lines[key].replace(/=/g, ' === ');
  });
  return lines;
}

//   return tabs
//     .reverse()
//     .map((value) => value.content)
//     .join()
// }

let tabs;
let store;
function setDispatch({
  varAdd,
  varReset
}) {
  store = {
    varAdd,
    varReset
  };
}
function setTabs(externalTabs) {
  tabs = externalTabs;
}
function toJS() {
  store.varReset(); // and execute a interpreter
  // const codesInString = joinCodes(tabs)

  const codesInString = tabs[0].content;
  const [title, codeFromTitle] = files(codesInString);
  const literals = vars(codeFromTitle, store);
  const diff = diffAlg(codesInString, literals);
  const map = tabs.map(v => v.content); // show the output

  const code = transform(codeFromTitle);
  return {
    title,
    literals,
    code,
    diff,
    map
  };
}

/** @module @choco/algorithm-transpiler/vector */

/** @classdesc Represent a Array of algorithms. */
class Vector {
  /**
   * Constructor.
   *
   * @param {number} size - Vector size.
   * @example
   * new Vector(10)
   */
  constructor(size) {
    if (size <= 0 || typeof size !== 'number') throw new Error('ERROR: invalid array argument');
    /** vector size */

    this.size = size;
    /** inner array */

    this.array = [];
  }
  /**
   * Assign value in vector.
   *
   * @param {any} value - Value to be added.
   * @param {number} index - Index in vector.
   */


  add(value, index) {
    const fixIndex = index - 1;
    if (fixIndex === -1) throw new Error('ERROR: array null point');
    if (fixIndex < this.size && this.size > 0) this.array[fixIndex] = value;else throw new Error('ERROR: array overflow');
  }
  /**
   * Get a value of vector.
   *
   * @param {number} index - Index of vector.
   * @returns {any} Value store in index argument.
   */


  show(index) {
    const start = index - 1;
    if (start < this.size && start >= 0) return this.array[start];
    throw new Error('ERROR: array null point');
  }
  /**
   * Provide an alternative interface, used in libs/algorithm/transform.
   *
   * @param {number} index - Index of Vector.
   * @see {@link transform}
   * @returns {}
   */


  io(index) {
    return {
      /**
       * Assign value in vector
       * @param {any} value - Value to be added
       */
      add: value => this.add(value, index),

      /**
       * Get a value of vector
       * @returns {any} Value store in index argument
       */
      show: () => this.show(index),

      /**
       * Get value of vector if it's parse to string
       * @returns {any} Value store in index argument
       */
      toString: () => this.show(index),

      /**
       * Confirm that is a vector
       * @returns {boolean}
       */
      isVector: () => true
    };
  }

}

/** @module @choco/algorithm-transpiler/io */

const io = {
  show: true,

  reset() {
    this.text = undefined;
    this.lastText = undefined;
    this.show = true;
  },

  addText(text) {
    this.lastText = this.text;
    this.text = text;
  },

  error() {
    this.show = false;
  }

};
function read(toRead, variables, lastLine) {
  const {
    typeError
  } = locale.all();
  let toReadCopy = toRead; // flags

  let isVector = false;
  let newLastLine; // clean up unnecessary signs

  while (toReadCopy.substr(0, 1) === ' ') {
    const length = toReadCopy.length - 1;
    toReadCopy = toReadCopy.substr(1, length);
  }

  while (toReadCopy.substr(toReadCopy.length - 1, 1) === ' ') toReadCopy = toReadCopy.substr(0, toReadCopy.length - 1);

  let input;
  if (io.text && io.text !== io.lastRext) input = prompt(io.text);else input = prompt(''); // if var not exist, not work

  if (lastLine && lastLine.var) newLastLine = Object.freeze({ ...lastLine,
    content: input
  });else newLastLine = Object.freeze({ ...lastLine,
    var: input
  });
  if (typeof toReadCopy === 'object') return readResponse(`${toReadCopy} = ${input};`, newLastLine); // vector

  if (toReadCopy.search(/\.io\(/) !== -1) {
    isVector = true;
    toReadCopy += `.add(${input})`;
  } // here in runtime show the mistakes in assignings


  console.log(variables, variables[toReadCopy], 'copy');

  switch (variables[toReadCopy]) {
    case 'int':
      if (Number.isNaN(Number(input)) || +input !== Math.trunc(input)) return readResponse(`write('${typeError.int}'); io.error();`, newLastLine);
      break;

    case 'double':
      if (Number.isNaN(Number(input))) return readResponse(`write('${typeError.double}'); io.error();`, newLastLine);
      break;

    case 'string':
      break;

    case 'bool':
      if (Number.isNaN(Number(input)) || input === true || input === false) return readResponse(`write('${typeError.bool}'); io.error();`, newLastLine);
      break;

    default:
      throw new Error('Unknow var type');
  }

  if (variables[toReadCopy] === 'string') return readResponse(`${toReadCopy} = '${input}';`, newLastLine);
  if (isVector) return readResponse(`${toReadCopy};`, newLastLine);
  return readResponse(`${toReadCopy} = ${input};`, newLastLine);
}

function readResponse(assign, lastLine) {
  // const id = keychain('line')
  return Object.freeze({
    assign,
    lastLine
  });
}

function write(...args) {
  // var
  let result = '';
  let error;
  Object.values(args[0]).forEach(text => {
    let textCopy = text;
    if (typeof textCopy === 'object' && textCopy.isVector && textCopy.isVector()) textCopy = textCopy.show();
    if (typeof textCopy === 'number' && Number.isNaN(textCopy)) error = `write('${error.stringForNumber}'); io.error();`;
    if (typeof textCopy === 'number' && !Number.isFinite(textCopy)) error = `write('${error.infinity}'); io.error();`;
    result += textCopy;
  });
  if (error) return Object.freeze({
    id: keychain('line'),
    error: true,
    content: error
  }); // io.show is a flag, avoids execution after errors

  if (io.show) {
    // if (io.lastText === result)
    //   io.resetLast()
    io.addText(result);
    return Object.freeze({
      id: keychain('line'),
      error: false,
      content: result
    });
  }

  return Object.freeze({
    id: keychain('line'),
    error: false,
    content: ''
  });
}

algorithmTranspilerLang();

export { Vector, algorithmTranspilerLang, io, read, setDispatch, setTabs, toJS, write };
//# sourceMappingURL=algorithm-transpiler.esm.js.map
