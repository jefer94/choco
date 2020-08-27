import { Document, Schema, model } from 'mongoose'
// import { encrypt } from '@choco/password'

export type AuthUserFields = {
  readonly username: string
  readonly email: string
  readonly password: string
  readonly scopes: readonly typeof Schema.Types.ObjectId[]
};

export type AuthUserDocument = Document & AuthUserFields

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scopes: [{ ref: 'Scope', type: Schema.Types.ObjectId }]
}, { timestamps: true })

// schema.pre('save', (next) => {
//   // if (!this.isModified('password')) return next()
//   // this.password = encrypt(this.password)
//   return this
// })

function transform(): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = this.toObject()
  return { id: _id, ...obj }
}

schema.method('transform', transform)

export const AuthUser = model<AuthUserDocument>('AuthUser', schema)
