/**
 * Capitalize first letter.
 *
 * @param {string} string - String.
 * @returns {string} String with first letter capitalize.
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
