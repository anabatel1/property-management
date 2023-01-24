const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Listing = require('../models/listing')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)

    next()
    return
  }

  request.token = null

  next()
  return
}

const userExtractor = async (request, response, next) => {
  // The validity of the token is checked with jwt.verify.
  // The method also decodes the token, or returns the Object which the token was based on.
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  request.user = user

  next()
}

const listingExtractor = async (request, response, next) => {
  // The validity of the token is checked with jwt.verify.
  // The method also decodes the token, or returns the Object which the token was based on.
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const listing = await Listing.findById(request.body.listingId)

  request.listing = listing

  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'MongoServerError' && error.code === 11000) {
    response.status(400).send({ error: `Duplicate validation error for ${Object.keys(error.keyPattern)}` })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  listingExtractor,
  unknownEndpoint,
  errorHandler
}