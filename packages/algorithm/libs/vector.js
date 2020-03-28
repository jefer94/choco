/** @module libs/vector */

/** @classdesc Represent a Array of algorithms. */
class Vector {
  /**
   * Constructor.
   *
   * @param {number} size - Vector size.
   * @example
   * new Vector(10)
   */
  constructor(size) {
    if (size <= 0 || typeof size !== 'number') throw new Error('ERROR: invalid array argument')

    /** vector size */
    this.size = size

    /** inner array */
    this.array = []
  }

  /**
   * Assign value in vector.
   *
   * @param {any} value - Value to be added.
   * @param {number} index - Index in vector.
   */
  add(value, index) {
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
  show(index) {
    const start = index - 1
    if (start < this.size && start >= 0) return this.array[start]
    throw new Error('ERROR: array null point')
  }

  /**
   * Provide an alternative interface, used in libs/algorithm/transform.
   *
   * @param {number} index - Index of Vector.
   * @see {@link transform}
   * @returns {}
   */
  io(index) {
    return {
      /**
       * Assign value in vector
       * @param {any} value - Value to be added
       */
      add: (value) => this.add(value, index),

      /**
       * Get a value of vector
       * @returns {any} Value store in index argument
       */
      show: () => this.show(index),

      /**
       * Get value of vector if it's parse to string
       * @returns {any} Value store in index argument
       */
      toString: () => this.show(index),

      /**
       * Confirm that is a vector
       * @returns {boolean}
       */
      isVector: () => true
    }
  }
}

export default Vector
