import * as path from 'path'

/**
 * Generate url.
 * @param host - Hostname.
 * @param paths - Paths.
 * @example
 * ```
 * url('potato.io', 'path', 'subpath') // 'potato.io/path/subpath'
 * ```
 * @returns Url.
 */
export function url(host = '', ...paths: readonly string[]): string {
  const hostname = host.replace(/\/$/, '')
  const urlPath = paths.reduce((acc, value = '') => path.join(acc, value), '/')

  return hostname + urlPath.replace(/\/$/, '')
}
