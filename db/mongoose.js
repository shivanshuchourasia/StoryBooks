const mongoose = require('mongoose')
require('dotenv').config()

var env = process.env.NODE_ENV || 'development'
if(env === 'development'){
  var db = 'mongodb://127.0.0.1:27017/storybooks-dev'
} else {
  var db = process.env.mongoURI
}

// var db = process.env.mongoURI

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB Connected...')
})