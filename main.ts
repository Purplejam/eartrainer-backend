import {connectDB} from './db/connect'
import {app} from './app'



export const bootstrap = async (): Promise<void> => {
  const port = process.env.PORT || 5000
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
}

bootstrap()