import { Document, Schema, model } from 'mongoose'

export type ServiceFields = {
  // readonly namespace: string
  readonly name: string
};

export type ServiceDocument = Document & ServiceFields

const schema = new Schema({
  // namespace: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true }
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
})

export const Service = model<ServiceDocument>('Service', schema)
