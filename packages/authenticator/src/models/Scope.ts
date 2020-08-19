import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  users: [{ ref: 'AuthUser', type: Schema.Types.ObjectId }]
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const Scope = model('Scope', schema)
