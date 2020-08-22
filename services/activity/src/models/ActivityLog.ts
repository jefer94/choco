import { Document, Schema, model } from 'mongoose'

export type ActivityLogFields = {
  readonly user: string
  readonly activity: typeof Schema.Types.ObjectId
};

export type ActivityLogDocument = Document & ActivityLogFields

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  activity: { ref: 'Activity', type: Schema.Types.ObjectId }
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
})

export const ActivityLog = model<ActivityLogDocument>('ActivityLog', schema)
