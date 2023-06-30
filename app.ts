import 'express-async-errors'
import authRouter from './routes/authRouter'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, {Express} from 'express'
import path from 'path'
import testRouter from './routes/testsRouter'
import {errorHandlerMiddleware} from './middleware/errorHandler'
import {notFoundMiddleware} from './middleware/notFound'
dotenv.config()


export const app: Express = express()
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET as string));
app.set('trust proxy', 1)


app.use(cors({
    origin: 'https://eartrainer-v2-frontend.vercel.app/',
    credentials: true
}))


//static files
app.use(express.static('public'))
app.use(express.static(path.resolve(__dirname, './client/build')));

//routes and error handlers
app.use('/api/v1/tests', testRouter)
app.use('/api/v1/auth', authRouter)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


