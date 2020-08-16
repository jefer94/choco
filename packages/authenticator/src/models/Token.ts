import { Schema, model } from 'mongoose'

const schema = new Schema({
  token: { type: String, required: true, unique: true },
  exp: { type: Number, required: true },
  active: { type: Boolean, required: true },
  userId: { ref: 'AuthUser', type: Schema.Types.ObjectId }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

export const Token = model('Token', schema)
