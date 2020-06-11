/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import multer from 'multer'

/** @module @choco/middlewares */

const storage = multer.memoryStorage()

// eslint-disable-next-line jsdoc/require-jsdoc
function onlyImages(req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

export const allowOneFile = (name = 'field', opts = {}) =>
  multer({ ...{ storage }, ...opts }).single(name)
export const allowArrayOfFiles = (name = 'field', opts = {}) =>
  multer({ ...{ storage }, ...opts }).array(name)

export const inMemoryAllowOneFile = (name = 'field', opts = {}) =>
  multer({ ...{ storage }, ...opts }).single(name)
export const inMemoryAllowArrayOfFiles = (name = 'field', opts = {}) =>
  multer({ ...{ storage }, ...opts }).array(name)

export const allowOneImage = (name = 'field', opts = {}) =>
  multer({ ...{ storage, fileFilter: onlyImages }, ...opts }).single(name)
export const allowArrayOfImages = (name = 'field', opts = {}) =>
  multer({ ...{ storage, fileFilter: onlyImages }, ...opts }).array(name)

export const inMemoryAllowOneImage = (name = 'field', opts = {}) =>
  multer({ ...{ storage, fileFilter: onlyImages }, ...opts }).single(name)
export const inMemoryAllowArrayOfImages = (name = 'field', opts = {}) =>
  multer({ ...{ storage, fileFilter: onlyImages }, ...opts }).array(name)
export const inMemoryAllowFieldsOfImages = (names = [{ name: 'field' }], opts = {}) =>
  multer({ ...{ storage, fileFilter: onlyImages }, ...opts }).fields(names)

// eslint-disable-next-line jsdoc/require-jsdoc
export function fieldsToUniqueArray(req, res, next) {
  if (req.files) {
    const response = []
    for (const i in req.files) { for (const j in req.files[i]) { response.push(req.files[i][j]) } }
    req.files = response
  }
  next()
}
