const express = require('express')

const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

const router = express.Router()

module.exports = params => {
  const { speakerService } = params
  router.get('/', async (req, res, next) => {
    try {
      const topSpeakers = await speakerService.getList()
      const artworks = await speakerService.getAllArtwork()
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artworks,
      })
    } catch (err) {
      return next(err)
    }
  })

  router.use('/speakers', speakersRoute(params))
  router.use('/feedback', feedbackRoute(params))

  return router
}
