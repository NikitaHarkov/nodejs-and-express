const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')
const createError = require('http-errors')

const bodyParser = require('body-parser')

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakerService = new SpeakerService('./data/speakers.json')

const routes = require('./routes')

const app = express()
const port = 3000

app.set('trust proxy', 1)

app.use(
  cookieSession({
    name: 'session',
    keys: ['Goal45df88r', 'h4jdihhndfklsd'],
  })
)

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.locals.siteName = 'ROUX Meetups'

app.use(express.static(path.join(__dirname, './static')))

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames()
    res.locals.speakerName = names
    return next()
  } catch (err) {
    return next(err)
  }
})

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
)

app.use((req, rex, next) => {
  return next(createError(404, 'File not found'))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message
  console.error(err)
  const status = err.status || 500
  res.locals.status = status
  res.status(status)
  res.render('error')
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
