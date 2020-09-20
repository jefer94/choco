type Obj = {
  readonly [key: string]: unknown
}

/**
 * Filter a object.
 * @param obj - Object.
 * @param rules - Array of properties.
 * @example
 * ```
 * const obj = {
 *   name: 'Pedro',
 *   rol: 'adc'
 * }
 * filterObject(obj, ['rol']) // returns { rol: 'adc' }
 * ```
 * @returns Object fltered.
 */
export function filterObject<Type>(obj: Type, rules: readonly string[]):
  Obj | Record<string, unknown> {
  const propertiesInObj = rules.filter((v) => obj[v] !== undefined)
  return propertiesInObj.reduce((newObj: Record<string, unknown>, value: string) =>
    ({ ...newObj, [value]: obj[value] }),
  {})
}
