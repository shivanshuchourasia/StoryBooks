const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const authRoute = require('./routes/authRoute')

const app = express()

// Passport config
require('./config/passport')(passport)

app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

// Passport middlewares
app.use(passport.initialize())
app.use(passport.session())

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// Load routes
app.use(authRoute)

app.get('/', (req, res) => {
  res.send('It works')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server is up on port', port)
})