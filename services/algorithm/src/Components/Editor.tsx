import React, { useState, ReactElement, useEffect } from 'react'
import EditorContainer from '@chocolab/editor'
import { chocolabTokens } from '@chocolab/algorithm-transpiler'

/**
 * Get height less navbar.
 * @returns Height less navbar.
 */
function windowHeight(): number {
  // return +window.innerHeight - 71
  return +window.innerHeight - 48
}

/**
 * Get width less navbar.
 * @returns Width less navbar.
 */
function windowWidth(): number {
  return +window.innerWidth
}

type Props = {
  readonly content: string
  readonly onChange: (content: string) => void
  readonly theme: Record<string, unknown>
}

/**
 * Editor wrapper.
 * @param props - Editor props.
 * @example
 * ```
 * // returns <Editor ... />
 * import React from 'react'
 * import Editor from '/components/Editor'
 * export default function () {
 *   return <Editor content="Content" onChange={value => console.log(value) } />
 * }
 * ```
 * @returns Editor component.
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
      <EditorContainer content={content} lang={chocolabTokens()} />
    </main>
  )
}
