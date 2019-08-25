const googleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('./keys')

module.exports = function (passport) {
  passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
    done()
  }))
}