/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import sharp from 'sharp'

/** @module @choco/middlewares */

export const resizeFiles = (size = [50, 100, 200]) => async (req, res, next) => {
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
