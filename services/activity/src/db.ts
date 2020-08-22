import mongoose from 'mongoose'

/** Database connection. */
export default function db(connection = 'mongodb://localhost/choco'): Promise<typeof mongoose> {
  return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
}
