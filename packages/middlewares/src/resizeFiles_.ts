import sharp from 'sharp'
import { Request, Response, NextFunction } from 'express'

/** @module @choco/middlewares */

type File = Express.Multer.File

function generateResize(files: readonly File[], sizes: readonly number[]):
  Promise<readonly File[]> {
  const result = files.reduce((acc: readonly Promise<File>[],
    file: File) => {
    const filesWithNewResolution = sizes.map(async (size) => ({
      ...file,
      ...{
        originalname: file.originalname.replace(
          /^(.+)\.([a-z]{1,})$/, `$1-${size}.$2`
        ),
        buffer: await sharp(file.buffer)
          .resize(size, size)
          .toBuffer(),
        resolution: size
      } }
    ))
    return [...acc, ...filesWithNewResolution]
  }, [])
  return Promise.all(result)
}

function getFiles(req: Request): readonly File[] {
  if (req.file) return [req.file].filter((v) => v)
  if (req.files && req.files instanceof Array) return req.files
  if (req.files) return Object.values(req.files).reduce((acc, files) => [...acc, ...files], [])
  return []
}

export const resizeFiles = (sizes = [50, 100, 200]) => async (
  req: Request, res: Response, next: NextFunction): Promise<void> => {
  const files: readonly File[] = getFiles(req)

  // const response = [...files]

  // for (const i in files) {
  //   for (const j in sizes) {
  //     response.push({ ...files[i],
  //       ...{
  //         originalname: files[i].originalname.replace(
  //           /^(.+)\.([a-z]{1,})$/, `$1-${sizes[j]}.$2`
  //         ),
  //         buffer: await sharp(files[i].buffer)
  //           .resize(sizes[j], sizes[j])
  //           .toBuffer(),
  //         resolution: sizes[j]
  //       } })
  //   }
  // }

  req.file = undefined
  const a = [...files, await generateResize(files, sizes)]
  req.files = [...files, await generateResize(files, sizes)]

  next()
}
