import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  user: { ref: 'AuthUser', type: Schema.Types.Array }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

export const Scope = model('Scope', schema)
