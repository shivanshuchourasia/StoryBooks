const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User