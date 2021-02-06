const express = require('express')

const router = express.Router()

module.exports = params => {
  const { speakerService } = params

  const getArtworks = async shortname => {
    let artworks = []
    if (!shortname) {
      artworks = await speakerService.getAllArtwork()
    } else {
      artworks = await speakerService.getArtworkForSpeaker(shortname)
    }
    return artworks
  }

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakerService.getList()
      const artworks = await getArtworks()
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artworks,
      })
    } catch (err) {
      return next(err)
    }
  })

  router.get('/:shortname', async (req, res, next) => {
    try {
      const { shortname } = req.params
      const speaker = await speakerService.getSpeaker(shortname)
      const artworks = await getArtworks(shortname)
      return res.render('layout', {
        pageTitle: speaker.name,
        template: 'speaker-detail',
        speaker,
        artworks,
      })
    } catch (err) {
      return next(err)
    }
  })
  return router
}
