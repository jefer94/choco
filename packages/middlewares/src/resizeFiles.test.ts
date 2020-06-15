import request from 'supertest'
import * as path from 'path'
import express from 'express'
import { inMemoryAllowOneImage, inMemoryAllowArrayOfImages } from './files'
import { resizeFiles } from './resizeFiles'

const app = express()

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

  app.post('/one', inMemoryAllowOneImage('field'), resizeFiles(), getResult)
  app.post('/multiple', inMemoryAllowArrayOfImages('field'), resizeFiles(), getResult)
})

test('add random value in filename', async () => {
  const { statusCode, text } = await request(app)
    .post('/one')
    .attach('field', fromRoot('./images/jhin.jpg'))

  expect(statusCode).toBe(200)
  expect(JSON.parse(text)).toHaveLength(4)
  testFile('jhin', text)
})

test('upload multiple files', async () => {
  const { statusCode, text } = await request(app)
    .post('/multiple')
    .attach('field', fromRoot('./images/jax.jpg'))
    .attach('field', fromRoot('./images/jhin.jpg'))
    .attach('field', fromRoot('./images/kassadin.jpg'))
    .attach('field', fromRoot('./images/tristana.jpg'))

  expect(statusCode).toBe(200)
  expect(JSON.parse(text)).toHaveLength(16)
  testFile('jax', text)
  testFile('jhin', text)
  testFile('kassadin', text)
  testFile('tristana', text)
})

// eslint-disable-next-line jsdoc/require-example
/**
 * Test file against response.
 *
 * @param {string} name - Name of file.
 * @param {string} text - Content of file.
 */
function testFile(name, text) {
  expect(new RegExp(`${name}.jpg`).test(text)).toBeTruthy()
  expect(new RegExp(`${name}-50.jpg`).test(text)).toBeTruthy()
  expect(new RegExp(`${name}-100.jpg`).test(text)).toBeTruthy()
  expect(new RegExp(`${name}-200.jpg`).test(text)).toBeTruthy()
  //
}
