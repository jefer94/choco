/**
 * Storybook config.
 * @example
 * storybook()
 * @returns Storybook config.
 */
module.exports = function storybook() {
  return {
    stories: ['../src/**/*.stories.[tj]s'],
    addons: ['@storybook/addon-storysource']
  }
}
