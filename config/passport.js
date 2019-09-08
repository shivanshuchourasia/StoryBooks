const googleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
require('dotenv').config()

module.exports = function (passport) {
  passport.use(new googleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {

    const newUser = {
      googleID: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value
    }

    try {
      const user = await User.findOne({ googleID: profile.id })

      if (!user){
        const user = new User(newUser)
        await user.save()
        done(null, user)
      }

      else done(null, user)

    } catch (e) {
      console.log(e)
    }

  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
  })
}