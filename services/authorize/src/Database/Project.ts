import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String,
  key: String,
  secret: String,
  customer: { ref: 'Customer', type: Schema.Types.ObjectId },
  users: { ref: 'User', type: Schema.Types.Array }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

export const Project = model('Project', schema)
