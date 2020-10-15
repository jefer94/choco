/* eslint-disable prefer-rest-params */
import mongoose from 'mongoose'
import redis from 'redis'
// import util from 'util'

const client = redis.createClient(process.env.REDIS)
// const get = util.promisify(client.get)
/**
 * Get value from key.
 * @param key - Key.
 * @returns Value.
 */
function get(key: string): Promise<string> {
  return new Promise((resolve) => {
    client.get(key, (err, value) => {
      // if (err) { reject(err) }
      resolve(value)
    })
  })
}

const { exec } = mongoose.Query.prototype

mongoose.Query.prototype.exec = async function (...arg: readonly any[]): Promise<any> {
  const Model = this.model
  const key = JSON.stringify({
    // eslint-disable-next-line no-underscore-dangle
    name: this._collection.collectionName,
    query: this.getQuery()
  })

  const cacheValue = await get(key)
  if (cacheValue) {
    const doc = JSON.parse(cacheValue)
    // console.log('Response from Redis')
    return Array.isArray(doc) ?
      doc.map((d) => new Model(d)) :
      new Model(doc)
  }
  const result = await exec.apply(this, arg)
  client.set(key, JSON.stringify(result) || '')
  // console.log('Response from MongoDB')
  return result
}

/** Database connection. */
export default function db(connection = 'mongodb://localhost/choco'): Promise<typeof mongoose> {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}
