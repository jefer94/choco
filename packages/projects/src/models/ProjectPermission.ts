import { Schema, model } from 'mongoose'

const schema = new Schema({
  write: Boolean,
  create: Boolean,
  remove: Boolean,
  projectId: { ref: 'Project', type: Schema.Types.ObjectId },
  userId: { type: String, required: true, unique: true }
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const ProjectPermission = model('ProjectPermission', schema)
