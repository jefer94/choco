/**
 * Transform case to snake case.
 *
 * @param key - Key to be transformed.
 * @returns Snake case.
 */
export function toSnakeCase(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}
