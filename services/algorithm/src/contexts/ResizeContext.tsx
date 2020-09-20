import React, { useEffect, useState, createContext, ReactElement, ReactNode } from 'react'

type ResizeContextAttr = {
  readonly width: number
  readonly height: number
  readonly isHorizontal?: () => boolean
  readonly isVertical?: () => boolean
  readonly aspectRatio?: () => readonly ['h' | 'v', number]
}

export const ResizeContext = createContext<ResizeContextAttr>({
  width: window.innerWidth,
  height: window.innerHeight
})

/**
 * @typedef {object} ResizeContextProviderProps
 * @property {object} children - Menu context provider children.
 */

type ResizeContextProviderProps = {
  readonly children: ReactNode
}

/**
 * Menu context provider.
 * @param {ResizeContextProviderProps} Props - Props.
 * @returns {object} Menu context provider.
 */
export function ResizeContextProvider({ children }: ResizeContextProviderProps): ReactElement {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  /**
   * Is horizontal.
     * @returns {boolean} Is horizontal.
   */
  function isHorizontal(): boolean {
    return width >= height
  }

  /**
   * Is vertical.
     * @returns {boolean} Is vertical.
   */
  function isVertical(): boolean {
    return width >= height
  }

  /**
   * Aspect ratio.
     * @returns {[string, number]} Orientation, proportion.
   */
  function aspectRatio(): readonly ['h' | 'v', number] {
    return isHorizontal() ? ['h', height / width] : ['v', width / height]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (width !== window.innerWidth || height !== window.innerHeight) {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        clearInterval(interval)
      }
    }, 0)
  }, [width, height])

  return (
    <ResizeContext.Provider value={{ width, height, isHorizontal, isVertical, aspectRatio }}>
      {children}
    </ResizeContext.Provider>
  )
}

export const ResizeContextConsumer = ResizeContext.Consumer
