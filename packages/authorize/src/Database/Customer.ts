import { Schema, model } from 'mongoose'

const schema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  projects: { ref: 'Customer', type: Schema.Types.Array }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

export const Customer = model('Customer', schema)
