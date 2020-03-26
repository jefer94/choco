import express from 'express'
// import dotenv from 'dotenv'
import '@services/env'
import { listProjects } from './routes/index.js'

// dotenv.config({ path: '../../../.env' })

const app = express()
const port = process.env.PORT || 3000

/**
 * @todo Add Mongoose.
 * @todo Persist tabs
 * @todo Persist code
 * @todo Persist lang
 * @todo Save project and load
 * @todo Cache
 * @todo Security headers
 * @todo Users and tokens
 * @todo Tests and docs 
 */

app
  .get('/', (req, res) => {
    res.json({})
  })
  .get('/projects', listProjects)
  .listen(port)