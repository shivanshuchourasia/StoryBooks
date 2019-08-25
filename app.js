const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const passport = require('passport')
const authRoute = require('./routes/authRoute')

const app = express()

app.use(authRoute)

// Passport config
require('./config/passport')(passport)

app.get('/', (req, res) => {
  res.send('It works')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server is up on port', port)
})