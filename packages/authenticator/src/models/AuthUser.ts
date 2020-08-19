import { Schema, model } from 'mongoose'
import { encrypt } from '@choco/password'

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scopes: [{ ref: 'Scope', type: Schema.Types.ObjectId }]
}, { timestamps: true })

// schema.pre('save', (next) => {
//   // if (!this.isModified('password')) return next()
//   // this.password = encrypt(this.password)
//   return this
// })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const AuthUser = model('AuthUser', schema)
