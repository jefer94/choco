import { Document, Schema, model } from 'mongoose'

export type ServiceFields = {
  readonly name: string
}

export type ServiceDocument = Document & ServiceFields

const schema = new Schema({
  // namespace: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  activities: [{ ref: 'Activity', type: Schema.Types.ObjectId, required: true }]
}, { timestamps: true, versionKey: false })

// function transform(): Record<string, unknown> {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { _id, __v, ...obj } = this.toObject()
//   return { id: _id, ...obj }
// }

// schema.method('transform', transform)

export const Service = model<ServiceDocument>('Service', schema)
