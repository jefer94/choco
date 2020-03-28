/**
 * Get CSS variable.
 *
 * @param {string} key - Key of CSS variable.
 * @param {boolean} camelCaseMoce - Selector in camel case format.
 */
export function getVar(key, camelCaseMoce = false) {
  const selector = camelCaseMoce ? camelCaseToCssVariable(key) : key
  return getComputedStyle(document.documentElement)
    .getPropertyValue(selector)
}

/**
 * Set CSS variable.
 *
 * @param {string} key - Key of CSS variable.
 * @param {string} value - Value of CSS variable.
 * @param {boolean} camelCaseMoce - Selector in camel case format.
 */
export function setVar(key, value, camelCaseMoce) {
  const selector = camelCaseMoce ? camelCaseToCssVariable(key) : key
  document.documentElement.style.setProperty(selector, value)
}

/**
 * Transform camel case selector to CSS selector.
 *
 * @param {string} s - Selector in camel case format.
 */
export function camelCaseToCssVariable(s) {
  return `-${s.replace(/([A-Z])/g, (v) => `-${v.toLowerCase()}`)}`
}
