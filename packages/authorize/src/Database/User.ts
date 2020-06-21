import { Schema, model } from 'mongoose'

const schema = new Schema({
  username: String,
  email: String,
  password: String,
  data: String,
  project: { ref: 'Project', type: Schema.Types.ObjectId }
}, {
  // discriminatorKey: 'recordVersion',
  versionKey: 'recordVersion',
  id: true,
  _id: false,
  timestamps: true
})

schema.pre('save', (next) => {
  let user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const User = model('User', schema)