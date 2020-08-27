import React, { useState, ReactElement } from 'react'
// import React, { useState, memo, useEffect } from 'react'
import { Dictionary } from '@chocolab/types'
import { CodemirrorWrapper } from './CodemirrorWrapper'
// import { editor as monaco } from 'monaco-editor/esm/vs/editor/editor.main'
// export { ControlledEditor } from '@monaco-editor/react'
// import { ControlledEditor } from '@monaco-editor/react'
// import register from '../libs/algorithm/monaco'

/** @module components/Editor */

/**
 * Get height less navbar.
 *
 * @returns {number} Height less navbar.
 */
function windowHeight(): number {
  // return +window.innerHeight - 71
  return +window.innerHeight - 48
}

/**
 * Get width less navbar.
 *
 * @returns {number} Width less navbar.
 */
function windowWidth(): number {
  return +window.innerWidth
}

/**
 * @typedef {object} EditorProps
 * @property {string} content - Value of editor.
 * @property {callback} onChange - On change send current content.
 */

type Props = {
  readonly content: string
  readonly onChange: () => void
  readonly theme: Dictionary
}

/**
 * Edidor wrapper.
 *
 * @param {EditorProps} props - Editor props.
 * @example
 * // returns <Editor ... />
 * import React from 'react'
 * import Editor from '/components/Editor'
 *
 * export default function () {
 *   return <Editor content="Content" onChange={value => console.log(value) } />
 * }
 * @returns {object} <Editor ... />.
 */
export function Editor({ content, onChange, theme }: Props): ReactElement {
  const [height, setHeight] = useState(windowHeight())
  const [width, setWidth] = useState(windowWidth())

  // useEffect(register, [])

  const loop = setInterval(() => {
    const currentHeight = windowHeight()
    const currentWidth = windowWidth()

    if (currentHeight !== height) {
      clearInterval(loop)
      setHeight(currentHeight)
    }

    if (currentWidth !== width) {
      clearInterval(loop)
      setWidth(currentWidth)
    }
  })

  // console.log(content, width, height, () => onChange)

  return (
    <main id="content1" className="tab show-content">
      {/* <ControlledEditor
        value={content}
        width={width}
        height={height}
        language="algorithm"
        theme="dark"
        onChange={(x, v) => onChange(v)}
        options={{
          fontSize: '14px',
          autoIndent: 'full'
        }}
      /> */}
      <CodemirrorWrapper height="calc(100vh - 48px)" theme={theme} content={content} />
    </main>
  )
}
