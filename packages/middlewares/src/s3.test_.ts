import request from 'supertest'
import { env } from '@chocolab/env'
import express from 'express'
import * as path from 'path'
import AWSMock from 'mock-aws-s3'

AWSMock.config.basePath = fromRoot('public')
const mockS3 = AWSMock.S3({
  params: { Bucket: 'adc' }
})

jest.mock('aws-sdk', () => ({ __esModule: true,
  default: {
    config: {
      update: () => {}
    },
    S3: class {
      constructor() {
        for (const i in mockS3) this[i] = mockS3[i]
      }
    }
  } }))

const app = express()

/**
 * Get path from current folder.
 * @param dir - Path.
 * @example
 * fromRoot(__dirname, 'potato') // returns '/home/potato/project/potato'
 * @returns Path.
 */
function fromRoot(dir: string): string {
  return path.join(__dirname, dir)
}

beforeAll(async () => {
  env('BUCKET', 'adc')
  env('IAM_KEY', 'a')
  env('IAM_SECRET', 'a')

  const { uploadToS3 } = await import('./s3')
  const { inMemoryAllowOneImage, inMemoryAllowArrayOfImages } = await import('./files')

  // eslint-disable-next-line jsdoc/require-jsdoc
  function getResult(req, res) {
    const { uploadError, isUploaded, uploadResult } = req
    res.json({ uploadError, isUploaded, uploadResult })
  }

  app.post('/one', inMemoryAllowOneImage('field'), uploadToS3, getResult)
  app.post('/multiple', inMemoryAllowArrayOfImages('field'), uploadToS3, getResult)
})

test('upload one file', async () => {
  const { statusCode, text } = await request(app)
    .post('/one')
    .attach('field', fromRoot('./images/jhin.jpg'))

  expect(statusCode).toBe(200)
  expect(JSON.parse(text.replace(/\/\//g, '/').replace(/\\\\/g, ''))).toEqual({
    isUploaded: true,
    uploadResult: [{
      href: fromRoot('public/adc/jhin.jpg'),
      field: 'field'
    }]
  })
})

test('upload multiple files', async () => {
  const { statusCode, text } = await request(app)
    .post('/multiple')
    .attach('field', fromRoot('./images/jax.jpg'))
    .attach('field', fromRoot('./images/jhin.jpg'))
    .attach('field', fromRoot('./images/kassadin.jpg'))
    .attach('field', fromRoot('./images/tristana.jpg'))

  expect(statusCode).toBe(200)

  const { isUploaded, uploadResult, ...rest } = JSON.parse(text.replace(/\/\//g, '/').replace(/\\\\/g, ''))
  expect(Object.keys(rest).length).toBeFalsy()
  expect(isUploaded).toBeTruthy()

  expect(uploadResult).toHaveLength(4)

  filterAndTest(uploadResult, 'jhin')
  filterAndTest(uploadResult, 'kassadin')
  filterAndTest(uploadResult, 'jax')
  filterAndTest(uploadResult, 'tristana')
})

// eslint-disable-next-line jsdoc/require-example
/**
 * Filter files by name and test.
 * @param {string[]} arr - Array of files.
 * @param {string} name - Name of file.
 */
function filterAndTest(arr, name) {
  const [filtered, ...rest] = arr.filter(({ href }) => new RegExp(name).test(href))

  expect(rest).toHaveLength(0)
  expect(filtered).toEqual({
    href: fromRoot(`public/adc/${name}.jpg`),
    field: 'field'
  })
}
