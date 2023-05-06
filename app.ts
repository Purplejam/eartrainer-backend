import express, {Express} from 'express'
import 'express-async-errors'
import {errorHandlerMiddleware} from './middleware/errorHandler'
import {notFoundMiddleware} from './middleware/notFound'
import testRouter from './routes/testsRouter'
import authRouter from './routes/authRouter'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()


export const app: Express = express()
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET as string));
app.set('trust proxy', 1)

//enable cors
app.use(cors({
    origin: 'https://eartrainer-v2-frontend.vercel.app',
    credentials: true
}))

//static files
app.use(express.static('public'))

//routes and error handlers
app.use('/api/v1/tests', testRouter)
app.use('/api/v1/auth', authRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


