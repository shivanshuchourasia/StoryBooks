const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB Connected...')
})