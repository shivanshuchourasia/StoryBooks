const express = require('express')
const router = new express.Router
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

// Stories Index
router.get('/stories', async (req, res) => {
  res.render('stories/index')
})

// Add Story Form
router.get('/stories/add', ensureAuthenticated, async (req, res) => {
  res.render('stories/add')
})

module.exports = router