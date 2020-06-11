/** @module @choco/middlewares */

// eslint-disable-next-line jsdoc/require-jsdoc
export function dateInFiles(req, res, next) {
  const files = req.files || [req.file].filter((v) => v)

  if (!files) { return next() }

  const response = files.map((value) => ({
    ...value,
    ...{
      originalname: value.originalname.replace(/^(.+)\.([a-z]{1,})$/, `$1-${(new Date()).toISOString()}.$2`)
    }
  }))

  req.file = undefined
  req.files = response

  return next()
}
