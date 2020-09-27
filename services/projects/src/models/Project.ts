import { Document, Schema, model } from 'mongoose'

export type ProjectFields = {
  readonly user: string
  readonly name: string
  readonly description: string
  readonly codes: readonly string[]
  readonly collaborators: readonly string[]
};

export type ProjectDocument = Document & ProjectFields

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  codes: [{ ref: 'Code', type: Schema.Types.ObjectId }],
  collaborators: [{ ref: 'ProjectPermission', type: Schema.Types.ObjectId }]
}, { timestamps: true, versionKey: false })

function transform(): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
}

schema.method('transform', transform)

export const Project = model<ProjectDocument>('Project', schema)
