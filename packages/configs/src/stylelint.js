/**
 * Stylelint config.
 * @returns Stylelint config.
 */
module.exports = function stylelint() {
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
