const express = require('express')

const router = express.Router()

module.exports = () => {
  router.get('/', (req, res) => res.send('Feeback page'))

  router.post('/:shortname', (req, res) => res.send('Feedback from posted'))

  return router
}
