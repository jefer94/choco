/**
 * Get CSS variable.
 *
 * @param {string} key - Key of CSS variable.
 * @param {boolean} camelCaseMode - Selector in camel case format.
 * @returns {string} CSS variable.
 */
export function getVar(key: string, camelCaseMode?: boolean): string {
  const selector = camelCaseMode ? camelCaseToCssVariable(key) : key
  return getComputedStyle(document.documentElement)
    .getPropertyValue(selector)
}

/**
 * Set CSS variable.
 *
 * @param {string} key - Key of CSS variable.
 * @param {string} value - Value of CSS variable.
 * @param {boolean} camelCaseMode - Selector in camel case format.
 */
export function setVar(key: string, value: string, camelCaseMode?: boolean): void {
  const selector = camelCaseMode ? camelCaseToCssVariable(key) : key
  document.documentElement.style.setProperty(selector, value)
}

/**
 * Transform camel case selector to CSS selector.
 *
 * @param {string} s - Selector in camel case format.
 * @returns {string} CSS selector.
 */
export function camelCaseToCssVariable(s: string): string {
  return `-${s.replace(/([A-Z])/g, (v) => `-${v.toLowerCase()}`)}`
}
