require('dotenv').config()

module.exports = {
   mongoURI: process.env.mongoURI,
   googleClientID: process.env.googleClientID,
   googleClientSecret: process.env.googleClientSecret
}