import React, { useRef, useEffect, createRef, useState, FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'
// import {EditorView} from "@codemirror/next/view"
// import {EditorState} from "@codemirror/next/state"
import { EditorView } from '@codemirror/next/view'
import { EditorState } from '@codemirror/next/state'
import { GutterMarker } from '@codemirror/next/gutter'
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
  readonly className: string
  readonly content: string
}

function CodemirrorWrapperBase({ className, content }: Props): ReactElement {
  const [loading, setLoading] = useState(true)
  let div = useRef()
  let editor = useRef()

  useEffect(() => {
    if (loading) {
      editor.current = new EditorView({state: EditorState.create({doc: content, extensions: []}) })
      setLoading(false)
    }
  
    else if (div.current && editor.current) div.current.appendChild(editor.current.dom)
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

export const CodemirrorWrapper = styled(CodemirrorWrapper)`
  & > div {
    height: ${(v) => v.height};
    max-height: ${(v) => v.height};
    outline: 0!important;
    background-color: ${(v) => v.theme.surface};
    color: ${(v) => v.theme.white};
    font-size: ${(v) => v.theme.fontSize};
    padding-left: 15px;
  }
`
