import dotenv from 'dotenv'
import * as path from 'path'

const { error, parsed } = dotenv.config({ path: path.join(process.cwd(), '../../.env'), debug: false })

// // was there an error?
// console.error(error)

// // what was parsed?
// console.log(parsed)

// // compare to process.env
// console.dir(process.env)