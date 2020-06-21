import { Schema, model } from 'mongoose'

const schema = new Schema({
  token: String,
  exp: Number,
  active: Boolean,
  scope: String,
  username: String,
  clientId: { ref: 'user', type: Schema.Types.ObjectId }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

export const Token = model('Token', schema)
