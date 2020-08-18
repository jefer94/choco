import mongoose from 'mongoose'

/** Database connection. */
export default function db(): Promise<typeof mongoose> {
  return mongoose.connect('mongodb://localhost/choco', { useNewUrlParser: true, useUnifiedTopology: true })
  // mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
}
