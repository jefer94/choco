import { Document, Schema, model } from 'mongoose'

export type ProjectPermissionFields = {
  readonly write?: boolean
  readonly create?: boolean
  readonly delete?: boolean
  readonly project?: typeof Schema.Types.ObjectId | string
  readonly user?: string
};

export type ProjectPermissionDocument = Document & ProjectPermissionFields

const schema = new Schema({
  write: Boolean,
  create: Boolean,
  delete: Boolean,
  project: { ref: 'Project', type: Schema.Types.ObjectId },
  user: { type: String, required: true, unique: true }
}, { timestamps: true })

function transform(): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
}

schema.method('transform', transform)

export const ProjectPermission = model<ProjectPermissionDocument>('ProjectPermission', schema)
