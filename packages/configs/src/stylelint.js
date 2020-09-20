/**
 * Stylelint config.
 * @returns Stylelint config.
 */
export function stylelint() {
  return {
    processors: [
      'stylelint-processor-styled-components'
    ],
    extends: [
      'stylelint-config-recommended',
      'stylelint-config-styled-components'
    ]
  }
}
