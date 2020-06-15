import sharp from 'sharp'
import { Request, Response, NextFunction } from 'express'

/** @module @choco/middlewares */

export const resizeFiles = (size = [50, 100, 200]) => async (
  req: Request, res: Response, next: NextFunction): Promise<void> => {
  const files = req.files || [req.file].filter((v) => v)
  const response = [...files]

  for (const i in files) {
    for (const j in size) {
      response.push({ ...files[i],
        ...{
          originalname: files[i].originalname.replace(
            /^(.+)\.([a-z]{1,})$/, `$1-${size[j]}.$2`
          ),
          buffer: await sharp(files[i].buffer)
            .resize(size[j], size[j])
            .toBuffer(),
          resolution: size[j]
        } })
    }
  }

  req.file = undefined
  req.files = response

  next()
}
