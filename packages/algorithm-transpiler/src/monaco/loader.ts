// export const conf = {
//   // eslint-disable-next-line no-useless-escape
//   wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,

//   comments: {
//     lineComment: '//',
//     blockComment: ['/*', '*/']
//   },

//   brackets: [
//     ['{', '}'],
//     ['[', ']'],
//     ['(', ')']
//   ],

//   // onEnterRules: [
//   //   {
//   //     // e.g. /** | */
//   //     // eslint-disable-next-line no-useless-escape
//   //     beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
//   //     afterText: /^\s*\*\/$/,
//   //     action: { indentAction: monaco.languages.IndentAction.IndentOutdent, appendText: ' * ' }
//   //   },
//   //   {
//   //     // e.g. /** ...|
//   //     // eslint-disable-next-line no-useless-escape
//   //     beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
//   //     action: { indentAction: monaco.languages.IndentAction.None, appendText: ' * ' }
//   //   },
//   //   {
//   //     // e.g.  * ...|
//   //     // eslint-disable-next-line no-useless-escape
//   //     beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
//   //     action: { indentAction: monaco.languages.IndentAction.None, appendText: '* ' }
//   //   },
//   //   {
//   //     // e.g.  */|
//   //     // eslint-disable-next-line no-useless-escape
//   //     beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
//   //     action: { indentAction: monaco.languages.IndentAction.None, removeText: 1 }
//   //   }
//   // ],

//   autoClosingPairs: [
//     { open: '{', close: '}' },
//     { open: '[', close: ']' },
//     { open: '(', close: ')' },
//     { open: '"', close: '"', notIn: ['string'] },
//     { open: '\'', close: '\'', notIn: ['string', 'comment'] },
//     { open: '`', close: '`', notIn: ['string', 'comment'] },
//     { open: '/**', close: ' */', notIn: ['string'] }
//   ],

//   folding: {
//     markers: {
//       start: new RegExp('^\\s*//\\s*#?region\\b'),
//       end: new RegExp('^\\s*//\\s*#?endregion\\b')
//     }
//   }
// }

// export const language = {
//   // Set defaultToken to invalid to see what you do not tokenize yet
//   defaultToken: 'invalid',
//   tokenPostfix: '.ts',

//   keywords: [
//     'abstract', 'as', 'break', 'case', 'catch', 'class', 'continue', 'const',
//     'constructor', 'debugger', 'declare', 'default', 'delete', 'do', 'else',
//     'enum', 'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
//     'get', 'if', 'implements', 'import', 'in', 'infer', 'instanceof', 'interface',
//     'is', 'keyof', 'let', 'module', 'namespace', 'never', 'new', 'null', 'package',
//     'private', 'protected', 'public', 'readonly', 'require', 'global', 'return',
//     'set', 'static', 'super', 'switch', 'symbol', 'this', 'throw', 'true', 'try',
//     'type', 'typeof', 'unique', 'var', 'void', 'while', 'with', 'yield', 'async',
//     'await', 'of'
//   ],

//   typeKeywords: [
//     'any', 'boolean', 'number', 'object', 'string', 'undefined'
//   ],

//   operators: [
//     '<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
//     '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
//     '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
//     '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
//     '^=', '@'
//   ],

//   // we include these common regular expressions
//   // eslint-disable-next-line no-useless-escape
//   symbols: /[=><!~?:&|+\-*\/\^%]+/,
//   escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
//   digits: /\d+(_+\d+)*/,
//   octaldigits: /[0-7]+(_+[0-7]+)*/,
//   binarydigits: /[0-1]+(_+[0-1]+)*/,
//   hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

//   // eslint-disable-next-line no-useless-escape
//   regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
//   // eslint-disable-next-line no-useless-escape
//   regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

//   // The main tokenizer for our languages
//   tokenizer: {
//     root: [
//       [/(algoritmo|variables|entero|inicio|mientras|finmientras|fin)/, 'tokens'],
//       [/\/\/.*/, 'comment'],
//       [/[0-9]+/, 'number'],
//       [/('.*'|".*")/, 'string']
//     ],

//     comment: [
//       // eslint-disable-next-line no-useless-escape
//       [/[^\*\}]+/, 'comment'],
//       // [/\(\*/,    'comment', '@push' ],    // nested comment  not allowed :-(
//       [/\}/, 'comment', '@pop'],
//       // eslint-disable-next-line no-useless-escape
//       [/[\{]/, 'comment']
//     ],

//     string: [
//       [/[^\\']+/, 'string'],
//       [/\\./, 'string.escape.invalid'],
//       [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
//     ],

//     whitespace: [
//       [/[ \t\r\n]+/, 'white'],
//       [/\{/, 'comment', '@comment'],
//       [/\/\/.*$/, 'comment']
//     ]
//   }
// }
