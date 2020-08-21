import { Document, Schema, model } from 'mongoose'

export type ScopeFields = {
  readonly name: string
  readonly users: readonly typeof Schema.Types.ObjectId[]
};

export type ScopeDocument = Document & ScopeFields

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  users: [{ ref: 'AuthUser', type: Schema.Types.ObjectId }]
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const Scope = model<ScopeDocument>('Scope', schema)
