// https://aws.amazon.com/es/sdk-for-node-js/
import AWS, { S3 } from 'aws-sdk'
import { env } from '@chocolab/env'
import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
      interface Request {
          /** `Multer.File` object populated by `single()` middleware. */
          file: Multer.File;
          /**
           * Array or dictionary of `Multer.File` object populated by `array()`,
           * `fields()`, and `any()` middleware.
           */
          files: {
              [fieldname: string]: Multer.File[];
          } | Multer.File[];
      }
  }
}

type a = {
  uploadResult: boolean
  isUploaded: boolean
}

// eslint-disable-next-line jsdoc/require-jsdoc
export async function uploadToS3(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!env('BUCKET')) { throw new Error('BUCKET env not set') }
  if (!env('IAM_KEY')) { throw new Error('IAM_KEY env not set') }
  if (!env('IAM_SECRET')) { throw new Error('IAM_SECRET env not set') }

  const credentials = {
    accessKeyId: env('IAM_KEY'),
    secretAccessKey: env('IAM_SECRET'),
    Bucket: env('BUCKET'),
    region: 'us-east-1',
    apiVersion: 'latest'
  }

  const files = req.files || req.file
  req.uploadResult = []
  req.isUploaded = false

  try {
    AWS.config.update(credentials)
    const s3bucket = new AWS.S3(credentials)
    await s3bucket.createBucket({ Bucket: env('BUCKET') })

    if (files instanceof Array) {
      await Promise.all(files.map((file, key) =>
        upload(file, s3bucket, req, key, files.length)))
      return next()
    }
    if (typeof files === 'object') {
      await upload(files, s3bucket, req)
      return next()
    }

    req.uploadError = 'error in files provided.'
    req.isUploaded = false
    return next()
  } catch (e) {
    req.uploadError = e
    req.isUploaded = false
    return next()
  }
}

/**
 * Upload file to bucket.
 *
 * @param item - File.
 * @param s3bucket - Bucket name.
 * @param req - Request.
 * @param key - Array key.
 * @param length - Array length.
 * @returns Was uploaded.
 */
async function upload(item: Express.Multer.File, s3bucket: S3, req: Request, key = 0, length = 1):
  Promise<boolean> {
  const params = {
    Bucket: env('BUCKET'),
    // Bucket: 'interpreterhub-development', // process.env.BUCKET,
    Key: item.originalname,
    Body: item.buffer,
    ACL: 'public-read'
  }

  try {
    const { Location } = await s3bucket.upload(params).promise()
    req.uploadResult.push({
      href: Location,
      field: item.fieldname,
      resolution: item.resolution
    })
    if (key + 1 === length) {
      // eslint-disable-next-line no-return-assign
      return req.isUploaded = true
    }
  } catch (e) {
    req.uploadError = e
    // eslint-disable-next-line no-return-assign
    return req.isUploaded = false
  }
}
