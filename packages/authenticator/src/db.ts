import mongoose from 'mongoose'

/** Database connection. */
export default function db(): void {
  mongoose.connect('mongodb://localhost/choco', { useNewUrlParser: true })
  // mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
}
