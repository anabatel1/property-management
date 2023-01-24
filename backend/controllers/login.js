const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const ONE_HOUR = 60*60

  // Create a token - the token will contain username and user id in a digitally signed form
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: ONE_HOUR }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = loginRouter