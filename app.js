require('dotenv').config()
require('express-async-errors')
const express = require('express')
const testRouter = require('./routes/testsRouter')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cors = require('cors')

const app = express()
app.use(express.json())
app.set('trust proxy', 1)

//enable all cors
app.use(cors())

//static files
app.use(express.static('public'))

//routes and error handlers
app.use('/api/v1/tests', testRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


module.exports = {
  app
}
