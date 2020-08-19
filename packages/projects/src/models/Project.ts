import { Schema, model } from 'mongoose'

const schema = new Schema({
  user: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  codes: [{ ref: 'Code', type: Schema.Types.ObjectId }]
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const Project = model('Project', schema)
