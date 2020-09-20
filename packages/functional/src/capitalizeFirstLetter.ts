/**
 * Capitalize first letter.
 * @param text - Text.
 * @returns String with first letter capitalize.
 */
export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
