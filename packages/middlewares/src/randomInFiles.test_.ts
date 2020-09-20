import request from 'supertest'
import * as path from 'path'
import express from 'express'
import { inMemoryAllowOneImage, inMemoryAllowArrayOfImages } from './files'
import { randomInFiles } from './randomInFiles'

const app = express()

/**
 * Get path from current folder.
 * @param dir - Path.
 * @example
 * ```
 * fromRoot(__dirname, 'potato') // returns '/home/potato/project/potato'
 * ```
 * @returns Path.
 */
function fromRoot(dir) {
  return path.join(__dirname, dir)
}

beforeAll(async () => {
  // eslint-disable-next-line jsdoc/require-jsdoc
  function getResult(req, res) {
    res.json(req.files.map((v) => v.originalname))
  }

  app.post('/one', inMemoryAllowOneImage('field'), randomInFiles, getResult)
  app.post('/multiple', inMemoryAllowArrayOfImages('field'), randomInFiles, getResult)
})

test('add random value in filename', async () => {
  const { statusCode, text } = await request(app)
    .post('/one')
    .attach('field', fromRoot('./images/jhin.jpg'))

  const [jhin, ...restOfElements] = JSON.parse(text)

  expect(statusCode).toBe(200)
  expect(restOfElements).toHaveLength(0)
  expect(/^jhin-[a-z0-9]{20}\.jpg$/i.test(jhin)).toBeTruthy()
})

test('upload multiple files', async () => {
  const { statusCode, text } = await request(app)
    .post('/multiple')
    .attach('field', fromRoot('./images/jax.jpg'))
    .attach('field', fromRoot('./images/jhin.jpg'))
    .attach('field', fromRoot('./images/kassadin.jpg'))
    .attach('field', fromRoot('./images/tristana.jpg'))

  expect(statusCode).toBe(200)
  expect(JSON.parse(text)).toHaveLength(4)
  expect(/jax-.{20}\.jpg/i.test(text)).toBeTruthy()
  expect(/jhin-.{20}\.jpg/i.test(text)).toBeTruthy()
  expect(/kassadin-.{20}\.jpg/i.test(text)).toBeTruthy()
  expect(/tristana-.{20}\.jpg/i.test(text)).toBeTruthy()
})
