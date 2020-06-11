/**
 * Storybook config.
 *
 * @example
 * storybook()
 * @returns {object} Storybook config.
 */
export function storybook() {
  return {
    stories: ['../src/**/*.stories.[tj]s'],
    addons: ['@storybook/addon-storysource']
  }
}
