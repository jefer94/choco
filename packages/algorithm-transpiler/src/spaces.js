/**
 * Remove spaces from code.
 *
 * @param {string} code - Code to remove spaces.
 * @example
 * spaces([' hello   ', '  apple    ']) // returns ['hello', 'apple']
 * @returns {string} Code without spaces.
 */
export default function spaces(code) {
  const lines = code.split('\n')
  return lines.map(removeSpacesInLine).join('\n')
}

/**
 * Remove spaces from line.
 *
 * @param {string} line - Line to remove spaces.
 * @example
 * spaces(' hello   ') // returns 'hello'
 * @returns {string} Line without spaces.
 */
function removeSpacesInLine(line) {
  return line.split(' ').reduce((result, value) => {
    if (!result.code) {
      result = {
        code: [],
        inString: false
      }
    }

    if (value === '"') result.inString = !result.inString
    if (!result.inString && value) result.code.push(value)
    else if (result.inString) result.code.push(value)

    return result
  }, {}).code.join(' ')
}