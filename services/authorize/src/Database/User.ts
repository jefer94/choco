import { Schema, model } from 'mongoose'
import { encrypt } from '@chocolab/password'

const schema = new Schema({
  username: String,
  email: String,
  password: String,
  data: String,
  project: { ref: 'Project', type: Schema.Types.ObjectId }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

schema.pre('save', (next) => {
  if (!this.isModified('password')) return next()
  this.password = encrypt(this.password)
  return this
})

export const User = model('User', schema)
