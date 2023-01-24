const log = function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }

  return ' '
}

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  log,
  info,
  error
}