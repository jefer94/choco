import { Schema, model } from 'mongoose'
import { encrypt } from '@choco/password'

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scopes: { ref: 'Scope', type: Schema.Types.Array }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

schema.pre('save', (next) => {
  // if (!this.isModified('password')) return next()
  // this.password = encrypt(this.password)
  return this
})

export const AuthUser = model('AuthUser', schema)
