const express = require('express')
const router = new express.Router
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth')
const Story = require('../models/story')

// Stories Index
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' }).populate('owner').sort({ date: 'desc' })
    res.render('stories/index', { stories })
  } catch (e) {
    res.status(400).send()
  }
 })

// Add Story Form
router.get('/stories/add', ensureAuthenticated, async (req, res) => {
  res.render('stories/add')
})

// Edit Story Form
router.get('/stories/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const story = await Story.findOne({_id: req.params.id, owner: req.user._id})
    if (!story) {
      return res.redirect('/stories')
    }
    if(req.user.id == story.owner){
      res.render('stories/edit', { story })
    }
  } catch (e) {
    res.status(400).send()
  }
})

// Add Story
router.post('/stories', ensureAuthenticated, async (req, res) => {
  let errors = []

  if (!req.body.title && !req.body.body) {
    errors.push({ text: 'Please add a title and story' })
  } else {
    if (!req.body.title) {
      errors.push({ text: 'Please add a title' })
    }
  
    if (!req.body.body) {
      errors.push({ text: 'Please add the story' })
    }
  }

  if (errors.length > 0) {
    res.render('stories/add', {
      errors,
      title: req.body.title,
      body: req.body.body
    })
  } else {
    if (req.body.allowComments) {
      req.body.allowComments = true
    } else {
      req.body.allowComments = false
    }
    const story = new Story({
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: req.body.allowComments,
      owner: req.user._id
    })

    try {
      await story.save()
      res.status(201).redirect('/dashboard')
    } catch (e) {
      res.status(400).send()
    }
  }
})

// Edit Story
router.put('/stories/:id', ensureAuthenticated, async (req, res) => {
  let errors = []

  if (!req.body.title && !req.body.body) {
    errors.push({ text: 'Please add a title and story' })
  } else {
    if (!req.body.title) {
      errors.push({ text: 'Please add a title' })
    }
  
    if (!req.body.body) {
      errors.push({ text: 'Please add the story' })
    }
  }

  if (errors.length > 0) {
    res.render('stories/add', {
      errors,
      title: req.body.title,
      body: req.body.body
    })
  } else {
    try {
      const story = await Story.findOne({_id: req.params.id, owner: req.user._id})

      if(!story){
        return res.status(404).send()
      }

      if (req.body.allowComments) {
        req.body.allowComments = true
      } else {
        req.body.allowComments = false
      }

      story.title = req.body.title
      story.body = req.body.body
      story.status = req.body.status
      story.allowComments = req.body.allowComments

      await story.save()
      res.redirect('/dashboard')
    } catch (e) {
      res.status(400).send()
    }
  }
})

// Delete Story
router.delete('/stories/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Story.deleteOne({_id: req.params.id, owner: req.user._id})
    res.redirect('/dashboard')
  } catch (e) {
    res.status(500).send()
  }
})

// Add Comment
router.post('/stories/comment/:id', ensureAuthenticated, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user._id
    }

    story.comments.unshift(newComment)
    await story.save()
    res.redirect(`/stories/show/${story.id}`)
  } catch (e) {
    res.status(400).send
  }
})

// Show Single Story
router.get('/stories/show/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('owner').populate('comments.commentUser')
    if(story && story.status === 'public') {
      res.render('stories/show', { story })
    }
    else if (story && story.status !== 'public' && req.user.id == story.owner._id) {
      res.render('stories/show', { story })
    } else {
      res.redirect('/stories')
    }
  } catch (e) {
    res.status(404).send()
  }
})

// Show User Story
router.get('/stories/user/:userId', async (req, res) => {
  try {
    const stories = await Story.find({ owner: req.params.userId, status: 'public' }).populate('owner').sort({ date: 'desc' })
    res.render('stories/index', { stories })
  } catch (e) {
    res.status(400).send()
  }
})

// Show My Story
router.get('/stories/my', ensureAuthenticated, async (req, res) => {
  try {
    const stories = await Story.find({ owner: req.user.id}).populate('owner').sort({ date: 'desc' })
    res.render('stories/index', { stories })
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router