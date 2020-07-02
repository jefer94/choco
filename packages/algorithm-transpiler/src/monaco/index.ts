import { languages, editor } from 'monaco-editor/esm/vs/editor/editor.main'
import locale from '@choco/i18n'
import { LangTranspiler, LangOpenBracket, LangCloseBracket, LangWrite, LangRead, LangType, LangVariables } from '../lang/common'

const algorithmWord = locale.one<string>('algorithmWord')
const begin = locale.one<string>('begin')
const end = locale.one<string>('end')
const forWord = locale.one<string>('forWord')
const toWord = locale.one<string>('toWord')
const variables = locale.one<LangVariables>('variables')
const transpiler = locale.one<LangTranspiler>('transpiler')
const openBracket = locale.one<LangOpenBracket>('openBracket')
const closeBracket = locale.one<LangCloseBracket>('closeBracket')
const write = locale.one<LangWrite>('write')
const read = locale.one<LangRead>('read')
const type = locale.one<LangType>('type')


/** @module libs/algorithm/Monaco */

/**
 * Name of new language for Monaco.
 *
 * @constant {string}
 * @default
 */
const id = 'algorithm'

/**
 * Register a new language for Monaco
 */
export default function () {
  languages.register({ id })
  // console.log({ tokenizer: lang.language.tokenizer })
  // languages.setMonarchTokensProvider(id, { tokenizer: lang.language.tokenizer })
  languages.setMonarchTokensProvider(id, {
    brackets: [
      ['[', ']', 'delimiter.curly'],
      ['(', ')', 'delimiter.curly']
    ],
    tokenizer: {
      root: [
        [new RegExp(`(${[
          ...[algorithmWord, begin, end, forWord, toWord],
          ...variables,
          ...Object.keys(transpiler),
          ...openBracket,
          ...closeBracket,
          ...write,
          ...read,
          ...Object.values(type)
        ].join('|')})`), 'keyword'],
        [/\/\/.*/, 'comment'],
        [/[0-9]+/, 'number'],
        [/(["'])(?:(?=(\\?))\2.)*?\1/, 'string'],
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        // [/"/, 'string'],
        // [/'/, 'string'],
        [/\[\(\)\]/, 'delimiter.bracket']
      ]
    }
  })
  editor.defineTheme('custom-vs-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // { token: 'tokens', foreground: '569cd6' },
      { token: 'comment', foreground: '608b4e' },
      // { token: 'number', foreground: 'b5cea8' },
      { token: 'string', foreground: 'ce9178' }
    ]
  })
  languages.registerCompletionItemProvider(id, {
    provideCompletionItems: () => [{
      label: 'para',
      kind: languages.CompletionItemKind.Text,
      insertText: 'para'
    }, {
      label: 'testing',
      kind: languages.CompletionItemKind.Keyword,
      // eslint-disable-next-line no-template-curly-in-string
      insertText: 'testing(${1:condition})',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
    }, {
      label: 'ifelse',
      kind: languages.CompletionItemKind.Snippet,
      insertText: [
        // eslint-disable-next-line no-template-curly-in-string
        'if (${1:condition}) {',
        '\t$0',
        '} else {',
        '\t',
        '}'
      ].join('\n'),
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'If-Else Statement'
    }]
  })
  // console.log(languages.getLanguages())
}
