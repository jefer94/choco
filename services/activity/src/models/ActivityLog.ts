import { Document, Schema, model } from 'mongoose'
import { ActivityDocument } from './Activity'

export type ActivityLogFields = {
  readonly user: string
  readonly activity: Pick<ActivityDocument, '_id' | '__v' | 'name' | 'service'>
}

export type ActivityLogDocument = Document & ActivityLogFields

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  activity: { ref: 'Activity', type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, versionKey: false })

// function transform(): Record<string, unknown> {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { _id, __v, ...obj } = this.toObject()
//   return { id: _id, ...obj }
// }

// schema.method('transform', transform)

export const ActivityLog = model<ActivityLogDocument>('ActivityLog', schema)
