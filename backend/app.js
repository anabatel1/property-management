const config = require('./utils/config')
const express = require('express')
// Removes the need for try-catch blocks
require('express-async-errors')
const cors = require('cors')
const app = express()
const loginRouter = require('./controllers/login')
const listingsRouter = require('./controllers/listings')
const usersRouter = require('./controllers/users')
const tenantsRouter = require('./controllers/tenants')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.static('build'))
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/listings', middleware.userExtractor, listingsRouter)
app.use('/api/tenants', middleware.userExtractor, middleware.listingExtractor, tenantsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app