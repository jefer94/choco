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
}, { timestamps: true, versionKey: false })

function transform(): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
}

schema.method('transform', transform)

export const Token = model<TokenDocument>('Token', schema)
