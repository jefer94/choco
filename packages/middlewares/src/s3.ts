// https://aws.amazon.com/es/sdk-for-node-js/
import AWS, { S3 } from 'aws-sdk'
import { env } from '@choco/env'
import { Request, Response, NextFunction } from 'express'

/** @module @choco/middlewares */

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
 * @param {object} item - File.
 * @param {object} s3bucket - Bucket name.
 * @param {object} req - Request.
 * @param {number} key - Array key.
 * @param {number} length - Array length.
 * @returns {Promise<boolean>} Was uploaded.
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
