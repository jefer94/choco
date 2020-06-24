import locale from '@choco/i18n'


/** @module libs/algorithm/files */

/**
 * @typedef {object} Files
 * @param {string} code - Algorithm lines.
 */

export type Files = readonly [string, string]

/**
 * Get name of algorithm.
 *
 * @param {string} code - Algorithm lines.
 * @returns {Files} Algorithm name and lines but first line.
 */
export default function files(code: string): Files {
  const algorithmWord = locale.one<string>('algorithmWord')
  const [firstLine, ...lines] = code.split('\n')
  const [keyword, name, ...restOfWords] = firstLine.split(' ')
  if (keyword === algorithmWord && name && restOfWords.length === 0) return [name, lines.join('\n')]
  throw new Error('name is invalid')
}
