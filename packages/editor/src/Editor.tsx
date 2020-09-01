import React, { ReactElement, useState, useRef, ChangeEvent } from 'react'
import { ChocolabTokens } from '@chocolab/algorithm-transpiler'
import Line from './Line'
import Comment from './keywords/Comment'
import Handler from './keywords/Handler'
import Number from './keywords/Number'
import String from './keywords/String'
import Text from './keywords/Text'
import Type from './keywords/Type'

type EditorProps = {
  readonly content?: string
  readonly lang: ChocolabTokens
}

export default function Editor({ content, lang }: EditorProps): ReactElement {
  // const [localContent, setLocalContet] = useState(content || '')
  const localContent = useRef(tokenizer(content))

  /**
   * On input handler.
   *
   * @param v - Input event.
   */
  function input(v: ChangeEvent<HTMLInputElement>): void {
    const current = v.target.innerText
    // eslint-disable-next-line functional/immutable-data
    localContent.current = tokenizer(current)
  }

  function highlight(s: string): ReactElement {
    const { comments, handlers, numbers, strings, types } = lang
    if (comments[0] && comments.some((exp) => exp[0].test(s))) return <Comment>{s}</Comment>
    if (handlers[0] && handlers.some((exp) => exp[0].test(s))) return <Handler>{s}</Handler>
    if (numbers[0] && numbers.some((exp) => exp[0].test(s))) return <Number>{s}</Number>
    if (strings[0] && strings.some((exp) => exp[0].test(s))) return <String>{s}</String>
    if (types[0] && types.some((exp) => exp[0].test(s))) return <Type>{s}</Type>
    return <Text>{s}</Text>
  }

  function tokenizeLine(line = ''): readonly ReactElement[] {
    // eslint-disable-next-line functional/prefer-readonly-type
    const res: ReactElement[] = []
    let [space, ...spaces] = line.split(/[^ ]+/) // get space
    let [word, ...words] = line.split(/ +/) // get words

    if (space) res.push(<>{space}</>)
    else [space, ...spaces] = spaces
    // eslint-disable-next-line functional/no-loop-statement
    while (space || spaces.length || word || words.length) {
      if (word) {
        res.push(highlight(word));
        [word, ...words] = words
      }
      else [word, ...words] = words
      if (space) {
        res.push(<>{space}</>);
        [space, ...spaces] = spaces
      }
      else [space, ...spaces] = spaces
    }

    return res
  }

  function tokenizer(s = ''): readonly ReactElement[] {
    return s.split('\n').map((line) =>
      <Line key={line}>{tokenizeLine(line)}</Line>)
    // return s.replace(/(algorithm)/, '<span>$1</span>')
    //
  }

  return (
    <div contentEditable onInput={input} style={{ marginLeft: 20, outline: 0 }}>
      {localContent.current}
    </div>
  )
}
