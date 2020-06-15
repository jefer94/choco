import request from 'supertest'
import * as path from 'path'
import express from 'express'
import { inMemoryAllowOneImage, inMemoryAllowArrayOfImages } from './files'
import { dateInFiles } from './dateInFiles'

const app = express()
const dateStringRegExp = '20[0-9]{2}-[0-1]{1}[1-9]{1}-[0-3]{1}[0-9]{1}T[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}.[0-9]{3}Z'

/**
 * Get path from current folder.
 *
 * @param {string} dir - Path.
 * @example
 * fromRoot(__dirname, 'potato') // returns '/home/potato/project/potato'
 * @returns {string} Path.
 */
function fromRoot(dir) {
  return path.join(__dirname, dir)
}

beforeAll(async () => {
  // eslint-disable-next-line jsdoc/require-jsdoc
  function getResult(req, res) {
    res.json(req.files.map((v) => v.originalname))
  }

  app.post('/one', inMemoryAllowOneImage('field'), dateInFiles, getResult)
  app.post('/multiple', inMemoryAllowArrayOfImages('field'), dateInFiles, getResult)
})

test('add random value in filename', async () => {
  const { statusCode, text } = await request(app)
    .post('/one')
    .attach('field', fromRoot('./images/jhin.jpg'))

  const [jhin, ...restOfElements] = JSON.parse(text)

  expect(statusCode).toBe(200)
  expect(restOfElements).toHaveLength(0)
  expect(new RegExp(`^jhin-${dateStringRegExp}\.jpg$`, 'i').test(jhin)).toBeTruthy()
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
  expect(new RegExp(`jax-${dateStringRegExp}\.jpg`, 'i').test(text)).toBeTruthy()
  expect(new RegExp(`jhin-${dateStringRegExp}\.jpg`, 'i').test(text)).toBeTruthy()
  expect(new RegExp(`kassadin-${dateStringRegExp}\.jpg`, 'i').test(text)).toBeTruthy()
  expect(new RegExp(`tristana-${dateStringRegExp}\.jpg`, 'i').test(text)).toBeTruthy()
})
