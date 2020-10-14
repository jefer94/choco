import { Document, Schema, model } from 'mongoose'

export type CodeFields = {
  readonly project: string
  readonly title: string
  readonly code: string
}

export type CodeDocument = Document & CodeFields

const schema = new Schema({
  project: { ref: 'Project', type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  code: { type: String, required: true }
}, { timestamps: true, versionKey: false })

// function transform(): Record<string, unknown> {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { _id, __v, ...obj } = this.toObject()
//   return { id: _id, ...obj }
// }

// schema.method('transform', transform)

export const Code = model<CodeDocument>('Code', schema)
