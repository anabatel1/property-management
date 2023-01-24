const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  // It's an array for one-to-many
  listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }]
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User