import { Document, Schema, model } from 'mongoose'

export type TokenFields = {
  readonly token: string
  readonly exp: number
  readonly active: boolean
  readonly user: typeof Schema.Types.ObjectId
};

export type TokenDocument = Document & TokenFields

const schema = new Schema({
  token: { type: String, required: true, unique: true },
  exp: { type: Number, required: true },
  active: { type: Boolean, required: true },
  user: { ref: 'AuthUser', type: Schema.Types.ObjectId }
}, { timestamps: true })

schema.method('transform', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()

  return { id: _id, ...obj }
})

export const Token = model<TokenDocument>('Token', schema)
