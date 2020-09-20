/**
 * Remove spaces from code.
 * @param code - Code to remove spaces.
 * @example
 * ```
 * spaces([' hello   ', '  apple    ']) // returns ['hello', 'apple']
 * ```
 * @returns Code without spaces.
 */
export default function spaces(code: string): string {
  const lines = code.split('\n')
  return lines.map(removeSpacesInLine).join('\n')
}

type SpaceResult = {
  code: string[] | undefined
  inString: boolean | undefined
}

/**
 * Remove spaces from line.
 * @param line - Line to remove spaces.
 * @example
 * spaces(' hello   ') // returns 'hello'
 * @returns Line without spaces.
 */
function removeSpacesInLine(line: string): string {
  const init: SpaceResult = {
    code: [],
    inString: false
  }

  return line.split(' ').reduce((result: SpaceResult, value): SpaceResult => {
    if (value === '"') result.inString = !result.inString
    if (!result.inString && value) result.code.push(value)
    else if (result.inString) result.code.push(value)

    return result
  }, init).code.join(' ')
}
