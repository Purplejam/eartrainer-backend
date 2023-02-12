import mongoose from 'mongoose'

export const connectDB = (url: string): Promise<typeof mongoose> => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}
