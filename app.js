const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
require('./db/mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

// Load Routes
const authRoute = require('./routes/authRoute')
const indexRoute = require('./routes/indexRoute')
const storiesRoute = require('./routes/storiesRoute')

const app = express()

// Handlebars Middlewares
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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

// Use routes
app.use(authRoute)
app.use(indexRoute)
app.use(storiesRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server is up on port', port)
})