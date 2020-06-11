/** @module @choco/middlewares */

/**
 * Generate random string.
 *
 * @param {number} length - Length.
 * @example
 * random(5) // returns '1Ft%y'
 * @returns {string} Random string.
 */
function random(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(
      Math.random() * charactersLength
    ))
  }

  return result
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function randomInFiles(req, res, next) {
  const files = req.files || [req.file].filter((v) => v)

  if (!files) { return next() }

  const response = files.map((value) => ({
    ...value,
    ...{
      originalname: value.originalname.replace(/^(.+)\.([a-z]{1,})$/, `$1-${random(20)}.$2`)
    }
  }))

  req.file = undefined
  req.files = response

  return next()
}
