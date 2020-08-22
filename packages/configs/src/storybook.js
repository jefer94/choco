/**
 * Storybook config.
 *
 * @example
 * storybook()
 * @returns Storybook config.
 */
export function storybook() {
  return {
    stories: ['../src/**/*.stories.[tj]s'],
    addons: ['@storybook/addon-storysource']
  }
}
