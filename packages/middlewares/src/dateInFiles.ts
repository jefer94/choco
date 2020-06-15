import { Request, Response, NextFunction } from 'express'
/** @module @choco/middlewares */

// eslint-disable-next-line jsdoc/require-jsdoc
export function dateInFiles(req: Request, res: Response, next: NextFunction): void {
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
