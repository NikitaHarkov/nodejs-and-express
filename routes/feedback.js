const express = require('express')

const router = express.Router()

module.exports = (params) => {
  const { feedbackService } = params
  router.get('/', async (req, res) => {
    const feedbacks = await feedbackService.getData()
    res.json(feedbacks)
  })

  router.post('/:shortname', (req, res) => res.send('Feedback from posted'))

  return router
}
