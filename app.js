const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connection } = require('./src/models')

require('dotenv').config()

const app = express()
app.use(cors())

const emujiRoutes = require('./src/apis/routes/emujis')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes which should handle requests
app.use('/emujis', emujiRoutes)

// Configure a middleware for 404s and the error handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

// Start server
connection.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})

module.exports = app