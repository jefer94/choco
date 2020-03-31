import React from 'react'
import styled from 'styled-components'
import { EditorView } from '@codemirror/next/view/dist'
import { EditorState } from '@codemirror/next/state/dist'
import { GutterMarker } from '@codemirror/next/gutter/dist'

import { useRef, useEffect, createRef, useState } from 'react'

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

function CodemirrorWrapper({ className, content }) {
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
  )
}

export default styled(CodemirrorWrapper)`
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