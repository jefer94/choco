/* eslint functional/no-class: 0 */

/** @module @choco/algorithm-transpiler/vector */

/**
 * @callback FunctionAdd
 * @param {any} value - Value to be added.
 */

/**
 * @callback FunctionShow
 * @returns {any} Value store in index argument.
 */

/**
 * @callback FunctionToString
 * @returns {any} Value store in index argument.
 */

/**
 * @callback FunctionIsVector
 * @returns {boolean} Value store in index argument.
 */

/**
 * @typedef {object} IO
 * @property {FunctionAdd} add - Assign value in vector.
 * @property {FunctionShow} show - Get a value of vector.
 * @property {FunctionToString} toString - Get value of vector if it's parse to string.
 * @property {FunctionIsVector} isVector - Confirm that is a vector.
 */

type IO<Type> = {
  readonly add: (value: Type) => void
  readonly show: () => Type
  readonly toString: () => Type
  readonly isVector: () => boolean
}

/** @classdesc Represent a Array of algorithms. */
export class Vector<Type> {
  size: number
  array: Array<Type>

  /**
   * Constructor.
   *
   * @param {number} size - Vector size.
   * @example
   * const arr = new Vector(10)
   */
  constructor(size: number) {
    if (size <= 0 || typeof size !== 'number') throw new Error('ERROR: invalid array argument')

    /** Vector size. */
    this.size = size

    /** Inner array. */
    this.array = []
  }

  /**
   * Assign value in vector.
   *
   * @param {any} value - Value to be added.
   * @param {number} index - Index in vector.
   */
  add(value: Type, index: number): void {
    const fixIndex = index - 1
    if (fixIndex === -1) throw new Error('ERROR: array null point')
    if (fixIndex < this.size && this.size > 0) this.array[fixIndex] = value
    else throw new Error('ERROR: array overflow')
  }

  /**
   * Get a value of vector.
   *
   * @param {number} index - Index of vector.
   * @returns {any} Value store in index argument.
   */
  show(index: number): Type {
    const start = index - 1
    if (start < this.size && start >= 0) return this.array[start]
    throw new Error('ERROR: array null point')
  }

  /**
   * Provide an alternative interface, used in libs/algorithm/transform.
   *
   * @param {number} index - Index of Vector.
   * @see {@link transform}
   * @returns {IO} Array IO interface.
   */
  io(index: number): IO<Type> {
    return {
      add: (value: Type) => this.add(value, index),
      show: () => this.show(index),
      toString: () => this.show(index),
      isVector: () => true
    }
  }
}
