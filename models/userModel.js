import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: String,
    required: true,
    validate: (password) => /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password),
  },
  userType: {
    type: String,
    default: 'basic_user',
  },
  profilePicture: { type: String, required: false },

  bioUser: { type: String, required: false },

  firstName: { type: String, required: false },

  lastName: { type: String, required: false },

  position: { type: String, required: false },

  postsPosted: { type: Array, required: false },

  companyRepresented: { type: String, required: false },

  jobsPosted: { type: Array, required: false },

  dateRegistered: { type: [Date] },

  lastUpdated: { type: Date, default: Date.now },

  yearsExp: { type: Number, required: false },

})

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: false } }))

userSchema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)