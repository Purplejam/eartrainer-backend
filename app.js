require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDB = require('./db/connect')
const testRouter = require('./routes/tests')

const app = express()

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.set('trust proxy', 1)

// extra packages
const cors = require('cors')

//enable ALL cors
app.use(cors())

//static files
app.use(express.static('public'))

// routes
app.use('/api/v1/tests', testRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
}

start()
