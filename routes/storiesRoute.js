const express = require('express')
const router = new express.Router

router.get('/stories', async (req, res) => {
  res.send('stories')
})



module.exports = router