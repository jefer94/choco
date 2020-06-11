/** @module @choco/functional */

/**
 * Filter a object.
 *
 * @param {object} obj - Object.
 * @param {string[]} rules - Array of properties.
 * @example
 * const obj = {
 *   name: 'Pedro',
 *   rol: 'adc'
 * }
 * filterObject(obj, ['rol']) // returns { rol: 'adc' }
 * @returns {object} Object fltered.
 */
export function filterObject(obj, rules) {
  const propertiesInObj = rules.filter((v) => obj[v] !== undefined)
  return propertiesInObj.reduce((newObj, value) =>
    ({ ...newObj, [value]: obj[value] }),
  {})
}
