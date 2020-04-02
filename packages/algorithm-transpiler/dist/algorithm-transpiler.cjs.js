'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const locale = _interopDefault(require('@choco/i18n'));
const functional = require('@choco/functional');
const keychain = _interopDefault(require('@choco/keychain'));

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var staticTokens = {
  // algorithm : js
  '<>': '!==',
  '<=': '<=',
  '>=': '>=',
  '<': '<',
  '>': '>',
  '<-': '='
};

var lang = 'en';
function en () {
  locale.set(lang, 'algorithmWord', 'algorithm');
  locale.set(lang, 'begin', 'begin');
  locale.set(lang, 'end', 'end');
  locale.set(lang, 'forWord', 'for');
  locale.set(lang, 'toWord', 'until');
  locale.set(lang, 'trueWord', 'true');
  locale.set(lang, 'falseWord', 'false');
  locale.set(lang, 'tokens', _objectSpread2({}, staticTokens, {}, {
    // algorithm : js
    or: '||',
    and: '&&',
    not: '!'
  }));
  locale.set(lang, 'variables', [// map
  'variables', 'var']);
  locale.set(lang, 'transpiler', {
    // algorithm : js
    "if": 'if',
    "else": '}\nelse {',
    "while": 'while',
    repeat: 'do {',
    until: '} while',
    "for": 'for',
    "do": 'do'
  });
  locale.set(lang, 'openBracket', [// map
  'do', 'until']);
  locale.set(lang, 'closeBracket', [// map
  'endif', 'end_if', 'endwhile', 'end_while', 'endfor', 'end_for']);
  locale.set(lang, 'write', [// map
  'show', 'write', 'print']);
  locale.set(lang, 'read', [// map
  'read']);
  locale.set(lang, 'type', {
    // type : algorithm
    "int": 'integer',
    "double": 'float',
    string: 'string',
    bool: 'boolean'
  });
  locale.set(lang, 'typeError', {
    // type : string in es
    "int": 'Error: don\'t is integer',
    "double": 'Error: don\'t is float',
    string: 'Error: don\'t is string',
    bool: 'Error: don\'t is boolean',
    unknow: function unknow(type) {
      return "Error: ".concat(type, " is not a valid variable type");
    }
  });
  locale.set(lang, 'error', {
    // error name : string in es
    stringForNumber: 'Error: a number cannot multiply a carapter',
    infinity: 'Error: dividing by 0 causes an infinite number',
    dispatchers: 'Error: dispatchers were not provided'
  });
  locale.set(lang, 'code', ['algorithm easy', 'variables', 'number, i, table[10]: integer', 'begin', '  i <- 0', '  write "Enter number a multiplier: "', '  read number', '  while (i < 10) do', '    i <- i + 1', '    table[i] <- number * i', '    write number, " * ", i, " = ", number * i', '  endwhile', 'end', ''].join('\n'));
}

var lang$1 = 'es';
function es () {
  locale.set(lang$1, 'algorithmWord', 'algoritmo');
  locale.set(lang$1, 'begin', 'inicio');
  locale.set(lang$1, 'end', 'fin');
  locale.set(lang$1, 'forWord', 'para');
  locale.set(lang$1, 'toWord', 'hasta');
  locale.set(lang$1, 'trueWord', 'verdadero');
  locale.set(lang$1, 'falseWord', 'falso');
  locale.set(lang$1, 'tokens', _objectSpread2({}, staticTokens, {}, {
    // algorithm : js
    o: '||',
    y: '&&',
    no: '!'
  }));
  locale.set(lang$1, 'variables', [// map
  'variables', 'var']);
  locale.set(lang$1, 'transpiler', {
    // algorithm : js
    si: 'if',
    sino: '}\nelse {',
    mientras: 'while',
    repetir: 'do {',
    hasta: '} while',
    para: 'for' // hacer: 'do'

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
    "int": 'entero',
    "double": 'real',
    string: 'carapter',
    bool: 'booleano'
  });
  locale.set(lang$1, 'typeError', {
    // type : string in es
    "int": 'Error: no es entero',
    "double": 'Error: no es flotante',
    string: 'Error: no es una cadena',
    bool: 'Error: no es booleano',
    unknow: function unknow(type) {
      return "Error: ".concat(type, " no es un tipo de variable valido");
    }
  });
  locale.set(lang$1, 'error', {
    // error name     : string in es
    stringForNumber: 'Error: un numero no puede multiplicar a un carapter',
    infinity: 'Error: dividir entre 0 causa un numero infinito',
    dispatchers: 'Error: No se recibieron dispatchers'
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
  var _locale$all = locale.all(),
      algorithmWord = _locale$all.algorithmWord;

  var _code$split = code.split('\n'),
      _code$split2 = _toArray(_code$split),
      firstLine = _code$split2[0],
      lines = _code$split2.slice(1);

  var _firstLine$split = firstLine.split(' '),
      _firstLine$split2 = _toArray(_firstLine$split),
      keyword = _firstLine$split2[0],
      name = _firstLine$split2[1],
      restOfWords = _firstLine$split2.slice(2);

  if (keyword === algorithmWord && name && restOfWords.length === 0) return [name, lines.join('\n')];
  throw new Error('name is invalid');
}

/**
 * Remove comments from line(s)
 * @param {string|string[]} code - Line(s) to be replaced
 * @example
 * import removeComments from '@choco/algorithm-transpiler'
 *
 * removeComments('hi //') // returns 'hi'
 * removeComments(['hi //', 'apple //']) // returns ['hi', 'apple']
 * @returns {string|string[]} Line(s) without comments
 */
function comments(code) {
  var regexp = /( ?\/\/.*$)/gm;
  return code instanceof Array ? code.map(function (v) {
    return v.replace(regexp, '');
  }) : code.replace(regexp, '');
}

/**
 * Remove spaces from code.
 *
 * @param {string} code - Code to remove spaces.
 * @example
 * spaces([' hello   ', '  apple    ']) // returns ['hello', 'apple']
 * @returns {string} Code without spaces.
 */
function spaces(code) {
  var lines = code.split('\n');
  return lines.map(removeSpacesInLine).join('\n');
}
/**
 * Remove spaces from line.
 *
 * @param {string} line - Line to remove spaces.
 * @example
 * spaces(' hello   ') // returns 'hello'
 * @returns {string} Line without spaces.
 */

function removeSpacesInLine(line) {
  return line.split(' ').reduce(function (result, value) {
    if (!result.code) {
      result = {
        code: [],
        inString: false
      };
    }

    if (value === '"') result.inString = !result.inString;
    if (!result.inString && value) result.code.push(value);else if (result.inString) result.code.push(value);
    return result;
  }, {}).code.join(' ');
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
  var _compose$split = functional.compose(comments, spaces, ignoreSentences)(code).split('\n'),
      _compose$split2 = _toArray(_compose$split),
      firstLine = _compose$split2[0],
      lines = _compose$split2.slice(1);

  var _firstLine$split = firstLine.split(' '),
      _firstLine$split2 = _toArray(_firstLine$split),
      keyword = _firstLine$split2[0],
      restOfVarLine = _firstLine$split2.slice(1);

  var result = '';
  if (isVarsZone(keyword, restOfVarLine)) Object.keys(lines).map(Number).forEach(function (key) {
    var words = lines[key].split(' ').filter(function (v) {
      return v;
    });
    Object.keys(words).map(Number).forEach(function (j) {
      if (j < words.length - 1) {
        var word = prepareWord(words[j]);
        result += "var ".concat(word, ";\n");
        reserveVars(store, words[words.length - 1], purgeVarName(words[j]));
      }
    });
  });
  return result.split('\n').filter(function (v) {
    return v;
  }).join('\n');
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
  var _locale$all = locale.all(),
      variables = _locale$all.variables;

  return variables.indexOf(keyword) !== -1 && !restOfVarLine.length;
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
 * // store generally is a reducer dispatchers
 * const store = {
 *   varAdd: () => {} // dispatch callback
 * }
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
  var _locale$all2 = locale.all(),
      type = _locale$all2.type,
      error = _locale$all2.error,
      typeError = _locale$all2.typeError;

  if (!store || !store.varAdd) throw new Error(error.dispatchers);

  switch (isA) {
    case type["int"]:
      store.varAdd('int', word);
      break;

    case type["double"]:
      store.varAdd('double', word);
      break;

    case type.string:
      store.varAdd('string', word);
      break;

    case type.bool:
      store.varAdd('bool', word);
      break;

    default:
      throw new Error(typeError.unknow(isA));
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
  var _locale$all3 = locale.all(),
      begin = _locale$all3.begin,
      end = _locale$all3.end; // return code.replace(code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))[0], '')


  return code.replace(RegExp("([\\s\\S]*?)(\\n".concat(begin, "[\\s\\S]*?").concat(end, "$)"), 'gm'), '$1');
}

/** @module @choco/algorithm-transpiler/diff */

/**
 * Diff between Algorithm code and Javascript code.
 *
 * @param {*} code - Algorithm code.
 * @param {*} js - Current Javascript code.
 * @todo support diff of vars lines
 * @example
 * const alg = [
 *   'variables',
 *   '  bestAdc: string'
 * ].join('\n')
 * const js = 'var bestAdc'
 * diff(alg, js) // return 1
 * @returns {number} Diff between codes.
 */

function diffAlg (code, js) {
  var _locale$all = locale.all(),
      begin = _locale$all.begin;

  var alg = code.split(/\n/);
  var beginIndex = 1;

  while (alg[beginIndex] && alg[beginIndex].match(RegExp(begin)) === null) {
    beginIndex += 1;
  }

  beginIndex += 1;
  var localJS = js.split(/\n/);
  var jsIndex = 0;

  while (/var/.test(localJS[jsIndex])) {
    jsIndex++;
  }

  return beginIndex - jsIndex;
}

algorithmTranspilerLang();
/** @module libs/algorithm/transform */
// transform between native languaje and javascipt

function transform (code) {
  var _locale$all = locale.all(),
      tokens = _locale$all.tokens,
      transpiler = _locale$all.transpiler,
      openBracket = _locale$all.openBracket,
      closeBracket = _locale$all.closeBracket,
      write = _locale$all.write,
      read = _locale$all.read;

  var line = functional.compose(stripCode, comments)(code); // stripCode(code)
  // let line = stripCode(code)

  var js = ''; // now the transpiler work

  Object.keys(line).map(Number).forEach(function (i) {
    // ...
    line[i] = purgeComment(line[i]);
    line[i] = purgeLine(line[i]); // vector.io(n).add(value)

    line[i] = vectorAdd(line[i]);

    if (line[i].substr(0, 1) === ' ') {
      var _length = line[i].length - 1;

      line[i] = line[i].substr(1, _length);
    }

    var length = line[i].length - 1;

    while (line[i].substr(length, 1) === ' ') {
      line[i] = line[i].substr(0, length);
    }

    if (line[i] === '') return; // if (x === y)

    line = ifIsEqual(line); // for (...)

    line[i] = forLoopCondition(line[i]); // do ... while (!...)

    line[i] = doWhileLoopCondition(line[i]); // each word is separated into a array

    var word = line[i].split(' '); // this loop is to search in various dictionaries, and transform that code

    Object.keys(word).map(Number).forEach(function (key) {
      // word[key] = word[key].replace(/=/g, ' === ')
      // dictionaries of words
      // open blackets
      if (openBracket.indexOf(word[key]) !== -1) js += '{ '; // close brackets
      else if (closeBracket.indexOf(word[key]) !== -1) js += '}';else if (transpiler[word[key]]) js += "".concat(transpiler[word[key]], " "); // dictionaries of tokens
        else if (tokens[word[key]]) js += "".concat(tokens[word[key]], " "); // and words not in the dictionary
          else js += "".concat(word[key], " ");
    }); // console.log('js', js)
    // this fracment of code delete all space in the start of a line
    // with a style like stack, first reverse the array

    word.reverse(); // then in spaceInStart assign the last element in the stack

    var spaceInStart = word.pop();
    var ifNoHaveSpaceInStart = spaceInStart; // while it is equal at ""
    // assign at spaceInStart the last element in the stack

    while (spaceInStart === '') {
      spaceInStart = word.pop();
    } // the last element never is ""


    if (typeof spaceInStart === 'undefined') word.push(ifNoHaveSpaceInStart);else word.push(spaceInStart); // and reverse the array again to finish

    word.reverse();
    var lastLine = js.split('\n')[js.split('\n').length - 1];
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
  var _locale$all2 = locale.all(),
      toWord = _locale$all2.toWord; // for (...)


  var line = lineArg;
  var matchCondition = line.match(RegExp("([\\s\\S]+".concat(toWord, "[\\s\\S]+)")));

  if (matchCondition) {
    var _matchCondition = _slicedToArray(matchCondition, 1),
        conditionsFor = _matchCondition[0];

    conditionsFor = conditionsFor.split(toWord);
    var ref = matchCondition[0].split(toWord);
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
  var _locale$all3 = locale.all(),
      toWord = _locale$all3.toWord; // do ... while (!...)


  if (line.match(RegExp("".concat(toWord, "\\s+([\\s\\S]+)")))) return line.replace('(', '(!(').replace(/\)\s{0,}$/, '))').replace(/=/g, '===');
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
  var line = lineArg; // vector.io(n).add(value)

  while (line.match(/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/)) {
    line = line.replace(/<-/, '');
    var exp = line.match(/\S+/g);
    line = "".concat(exp[0], ".add(");
    if (Number.isNaN(+exp[1])) line += "\"".concat(exp[1], "\"");else line += exp[1];
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
  var line = lineArg;

  if (line.search('//') !== -1) {
    var remove = line.substr(line.search('//'), line.length);
    line = line.replace(remove, '');
  }

  return line;
}
function stripCode(codeArg) {
  var _locale$all4 = locale.all(),
      begin = _locale$all4.begin,
      end = _locale$all4.end; // good in this space we are going to make a separation between the code
  // and the variables


  var _codeArg$match = codeArg.match(RegExp("".concat(begin, "[\\s\\S]*?").concat(end, "$"), 'gm')),
      _codeArg$match2 = _slicedToArray(_codeArg$match, 1),
      code = _codeArg$match2[0]; // each line is separated into a array


  var lines = code.split('\n'); // the word "fin" is deleted

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
  var _locale$all5 = locale.all(),
      openBracket = _locale$all5.openBracket; // if (x === y)


  var lines = linesArg;
  Object.keys(lines).map(Number).forEach(function (key) {
    if (lines[key].match(RegExp("=(.)+".concat(openBracket[key])))) lines[key] = lines[key].replace(/=/g, ' === ');
  });
  return lines;
}

//   return tabs
//     .reverse()
//     .map((value) => value.content)
//     .join()
// }

var tabs;
var store;
function setDispatch(_ref) {
  var varAdd = _ref.varAdd,
      varReset = _ref.varReset;
  store = {
    varAdd: varAdd,
    varReset: varReset
  };
}
function setTabs(externalTabs) {
  tabs = externalTabs;
}
function toJS() {
  store.varReset(); // and execute a interpreter
  // const codesInString = joinCodes(tabs)

  var codesInString = tabs[0].content;

  var _files = files(codesInString),
      _files2 = _slicedToArray(_files, 2),
      title = _files2[0],
      codeFromTitle = _files2[1];

  var literals = vars(codeFromTitle, store);
  var diff = diffAlg(codesInString, literals);
  var map = tabs.map(function (v) {
    return v.content;
  }); // show the output

  var code = transform(codeFromTitle);
  return {
    title: title,
    literals: literals,
    code: code,
    diff: diff,
    map: map
  };
}

/** @module @choco/algorithm-transpiler/vector */

/** @classdesc Represent a Array of algorithms. */
var Vector = /*#__PURE__*/function () {
  /**
   * Constructor.
   *
   * @param {number} size - Vector size.
   * @example
   * new Vector(10)
   */
  function Vector(size) {
    _classCallCheck(this, Vector);

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


  _createClass(Vector, [{
    key: "add",
    value: function add(value, index) {
      var fixIndex = index - 1;
      if (fixIndex === -1) throw new Error('ERROR: array null point');
      if (fixIndex < this.size && this.size > 0) this.array[fixIndex] = value;else throw new Error('ERROR: array overflow');
    }
    /**
     * Get a value of vector.
     *
     * @param {number} index - Index of vector.
     * @returns {any} Value store in index argument.
     */

  }, {
    key: "show",
    value: function show(index) {
      var start = index - 1;
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

  }, {
    key: "io",
    value: function io(index) {
      var _this = this;

      return {
        /**
         * Assign value in vector
         * @param {any} value - Value to be added
         */
        add: function add(value) {
          return _this.add(value, index);
        },

        /**
         * Get a value of vector
         * @returns {any} Value store in index argument
         */
        show: function show() {
          return _this.show(index);
        },

        /**
         * Get value of vector if it's parse to string
         * @returns {any} Value store in index argument
         */
        toString: function toString() {
          return _this.show(index);
        },

        /**
         * Confirm that is a vector
         * @returns {boolean}
         */
        isVector: function isVector() {
          return true;
        }
      };
    }
  }]);

  return Vector;
}();

/** @module @choco/algorithm-transpiler/io */

var io = {
  show: true,
  reset: function reset() {
    this.text = undefined;
    this.lastText = undefined;
    this.show = true;
  },
  addText: function addText(text) {
    this.lastText = this.text;
    this.text = text;
  },
  error: function error() {
    this.show = false;
  }
};
function read(toRead, variables, lastLine) {
  var toReadCopy = spaces(toRead); // flags

  var isVector = false;
  var newLastLine;
  var input;
  input = prompt(io.text); // if var not exist, not work
  // if (lastLine && lastLine.var) newLastLine = Object.freeze({ ...lastLine, content: input })
  // else newLastLine = Object.freeze({ ...lastLine, var: input })

  newLastLine = Object.freeze(_objectSpread2({}, lastLine, {
    "var": input
  })); // vector

  if (toReadCopy.search(/\.io\(/) !== -1) {
    isVector = true;
    toReadCopy += ".add(".concat(input, ")");
  } // console.log(toReadCopy, typeof toReadCopy)
  else {
      var result = checkVariables(variables[toReadCopy], newLastLine, input);
      if (result) return result;
      input = fixInputToBoolean(variables[toReadCopy], input);
    }

  if (variables[toReadCopy] === 'string') return readResponse("".concat(toReadCopy, " = '").concat(input, "';"), newLastLine);
  if (isVector) return readResponse("".concat(toReadCopy, ";"), newLastLine);
  return readResponse("".concat(toReadCopy, " = ").concat(input, ";"), newLastLine);
}

function readResponse(assign, lastLine) {
  // const id = keychain('line')
  return Object.freeze({
    assign: assign,
    lastLine: lastLine
  });
}

function checkVariables(type, newLastLine, input) {
  var _locale$all = locale.all(),
      typeError = _locale$all.typeError;

  switch (type) {
    case 'int':
      if (Number.isNaN(Number(input)) || +input !== Math.trunc(input)) return readResponse("write('".concat(typeError["int"], "'); io.error();"), newLastLine);
      break;

    case 'double':
      if (Number.isNaN(Number(input))) return readResponse("write('".concat(typeError["double"], "'); io.error();"), newLastLine);
      break;

    case 'string':
      break;

    case 'bool':
      var number = Number(input);
      if (!Number.isInteger(number) || number < 0 || number > 1) return readResponse("write('".concat(typeError.bool, "'); io.error();"), newLastLine); // else input = number === 1 ? 'true' : 'false'

      break;

    default:
      return readResponse("write('".concat(typeError.unknow(type), "'); io.error();"), newLastLine);
  }
}

function fixInputToBoolean(type, input) {
  if (type === 'bool') {
    return Number(input) === 1 ? 'true' : 'false';
  } else return input;
}

function write() {
  var _locale$all2 = locale.all(),
      error = _locale$all2.error; // var


  var result = '';
  var err;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  Object.values(args).forEach(function (text) {
    var textCopy = text;
    if (_typeof(textCopy) === 'object' && textCopy.isVector && textCopy.isVector()) textCopy = textCopy.show();
    if (typeof textCopy === 'number' && Number.isNaN(textCopy)) err = "write('".concat(error.stringForNumber, "'); io.error();");
    if (typeof textCopy === 'number' && !Number.isFinite(textCopy)) err = "write('".concat(error.infinity, "'); io.error();");
    result += textCopy;
  });
  if (err) return Object.freeze({
    id: keychain('line'),
    error: true,
    content: err
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

exports.Vector = Vector;
exports.algorithmTranspilerLang = algorithmTranspilerLang;
exports.io = io;
exports.read = read;
exports.setDispatch = setDispatch;
exports.setTabs = setTabs;
exports.toJS = toJS;
exports.write = write;
//# sourceMappingURL=algorithm-transpiler.cjs.js.map
