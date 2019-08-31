const express = require('express')
const path = require('path')
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

// JSON Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars Helpers
const {truncate, stripTags, formatDate} = require('./helpers/hbs')

// Handlebars Middlewares
app.engine('handlebars', exphbs({ 
  helpers: {truncate, stripTags, formatDate},
  defaultLayout: 'main' 
}))
app.set('view engine', 'handlebars')

// Passport config
require('./config/passport')(passport)

app.use(cookieParser())
var sess = {
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

// Passport middlewares
app.use(passport.initialize())
app.use(passport.session())

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

// Use routes
app.use(authRoute)
app.use(indexRoute)
app.use(storiesRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server is up on port', port)
})