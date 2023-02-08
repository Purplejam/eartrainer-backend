require('dotenv').config()
const connectDB = require('./db/connect')
const {app} = require('./app')

const port = process.env.PORT || 5000

const bootstrap = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
}

bootstrap()