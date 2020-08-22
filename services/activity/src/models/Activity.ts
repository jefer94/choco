import { Document, Schema, model } from 'mongoose'

export type ActivityFields = {
  readonly name: string
  readonly service: string
};

export type ActivityDocument = Document & ActivityFields

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  service: { ref: 'Service', type: Schema.Types.ObjectId, required: true }
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
})

export const Activity = model<ActivityDocument>('Activity', schema)
