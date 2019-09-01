const express = require('express')
const router = new express.Router
const Story = require('../models/story')
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome')
})

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const stories = await Story.find({ owner: req.user.id })
    res.render('index/dashboard', { stories })
  } catch(e) {
    res.status(404).send()
  }
})

router.get('/about', (req, res) => {
  res.render('index/about')
})

module.exports = router