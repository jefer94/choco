/**
 * Capitalize first letter.
 *
 * @param {string} text - Text.
 * @returns {string} String with first letter capitalize.
 */
export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
