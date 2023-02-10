import express, {Express} from 'express'
import {errorHandlerMiddleware} from './middleware/errorHandler'
import {notFoundMiddleware} from './middleware/notFound'
import testRouter from './routes/testsRouter'
import 'express-async-errors'
import cors from 'cors'


export const app: Express = express()
app.use(express.json())
app.set('trust proxy', 1)

//enable cors
app.use(cors())

//static files
app.use(express.static('public'))

//routes and error handlers
app.use('/api/v1/tests', testRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


