import locale from '@choco/i18n'


/** @module libs/algorithm/files */

/**
 * @typedef {object} Files
 * @param {string} code - Algorithm lines.
 */

/**
 * Get name of algorithm.
 * @param {string} code - Algorithm lines
 * @returns {Files} Algorithm name and lines but first line
 * return
 */
export default function (code) {
  const { algorithmWord } = locale.all()
  const [firstLine, ...lines] = code.split('\n')
  const [keyword, name, ...restOfWords] = firstLine.split(' ')
  if (keyword === algorithmWord && name && restOfWords.length === 0) return [name, lines.join('\n')]
  throw new Error('name is invalid')
}
