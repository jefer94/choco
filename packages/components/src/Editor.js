import React, { useState, memo, lazy, useEffect } from 'react'
// import React, { useState, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { editor as monaco } from 'monaco-editor/esm/vs/editor/editor.main'
import register from '../libs/algorithm/monaco'

/** @module components/Editor */

const ControlledEditor = lazy(() => import(/* webpackPreload: true */ './MonacoWrapper'))

/**
 * Get height less navbar.
 *
 * @returns {number} Height less navbar.
 */
function windowHeight() {
  // return +window.innerHeight - 71
  return +window.innerHeight - 48
}

/**
 * Get width less navbar.
 *
 * @returns {number} Width less navbar.
 */
function windowWidth() {
  return +window.innerWidth
}

/**
 * @typedef {Object} EditorProps
 * @property {string} content - Value of editor
 * @property {callback} onChange - On change send current content
 */

/**
 * Edidor wrapper.
 *
 * @param {EditorProps} props
 * @example
 * // returns <Editor ... />
 * import React from 'react'
 * import Editor from '/components/Editor'
 *
 * export default function () {
 *   return <Editor content="Content" onChange={value => console.log(value) } />
 * }
 * @returns {object} <Editor ... />
 */
function Editor({ content, onChange }) {
  const [height, setHeight] = useState(windowHeight())
  const [width, setWidth] = useState(windowWidth())

  useEffect(register, [])

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

  console.log(content, width, height, () => onChange)

  return (
    <main id="content1" className="tab show-content">
      <ControlledEditor
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
      />
    </main>
  )
}
Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default memo(Editor)
