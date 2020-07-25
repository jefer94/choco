import React, { useRef, useEffect, useState, ReactElement } from 'react'
import styled from 'styled-components'
import { EditorView } from '@codemirror/next/view'
import { EditorState } from '@codemirror/next/state'
import { lineNumbers } from '@codemirror/next/gutter'
import { defaultKeymap } from '@codemirror/next/commands'
import { javascript } from '@codemirror/next/lang-javascript'
import { oneDark } from '@codemirror/next/theme-one-dark'
// import { UnControlled as CodeMirror } from 'react-codemirror2'

// const Div = styled.div`
//   & > div {
//     height: ${(v) => v.height};
//     max-height: ${(v) => v.height};
//     outline: 0!important;
//     background-color: ${(v) => v.theme.surface};
//     color: ${(v) => v.theme.white};
//     font-size: ${(v) => v.theme.fontSize};
//     padding-left: 15px;
//   }
// `

type Props = {
  readonly className?: string
  readonly content: string
}

function CodemirrorWrapperBase({ className, content }: Props): ReactElement {
  const [loading, setLoading] = useState(true)
  const div = useRef<HTMLHeadingElement>()
  const editor = useRef<EditorView>()

  useEffect(() => {
    if (loading) {
      // eslint-disable-next-line functional/immutable-data
      editor.current = new EditorView({
        state: EditorState.create({
          doc: content,
          extensions: [lineNumbers(), javascript(), oneDark]
        }),
        dispatch: (v) => console.log('xxxxxxxxxx', v)
        // extensions: [keymap(defaultKeymap)]
        // extensions: []
        // extensions: [keymap(defaultKeymap), new GutterMarker()]
      })
      setLoading(false)
    }

    else if (div && div.current && editor.current) div.current.appendChild(editor.current.dom)
  }, [loading])

  return (
    <div className={className} ref={div} />
    // <CodeMirror
    //   value="<h1>I ♥ react-codemirror2</h1>"
    //   options={{
    //     mode: 'xml',
    //     theme: 'material',
    //     lineNumbers: true
    //   }}
    //   onChange={(editor, data, value) => {
    //     console.log(value)
    //   }}
    // />
  )
}

type CodemirrorWrapperProps = {
  readonly height: string
}

export const CodemirrorWrapper = styled(CodemirrorWrapperBase)`
  & > div {
    height: ${(v: CodemirrorWrapperProps) => v.height};
    max-height: ${(v: CodemirrorWrapperProps) => v.height};
    outline: 0!important;
    background-color: ${(v) => v.theme.surface};
    color: ${(v) => v.theme.white};
    font-size: ${(v) => v.theme.fontSize};
    padding-left: 15px;
  }
`
