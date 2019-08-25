const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('It works')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server is up on port', port)
})