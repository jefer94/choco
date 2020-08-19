import { Schema, model } from 'mongoose'

const schema = new Schema({
  projectId: { ref: 'Project', type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  code: { type: String, required: true }
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const Code = model('Code', schema)
