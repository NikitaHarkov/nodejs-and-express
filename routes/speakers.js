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

  router.get('/', async (req, res) => {
    const speakers = await speakerService.getList()
    const artworks = await getArtworks()
    res.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers',
      speakers,
      artworks,
    })
  })

  router.get('/:shortname', async (req, res) => {
    const { shortname } = req.params
    const speaker = await speakerService.getSpeaker(shortname)
    const artworks = await getArtworks(shortname)
    res.render('layout', {
      pageTitle: speaker.name,
      template: 'speaker-detail',
      speaker,
      artworks,
    })
  })
  return router
}
