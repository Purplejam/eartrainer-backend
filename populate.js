require('dotenv').config()

const mocksData = require('./testList-data-int-02.json')

const {Test, TestList} = require('./models/Test')
const connectDB = require('./db/connect')


const populate = async() => {
	try {
		await connectDB(process.env.MONGO_URI)
		//await TestList.deleteMany()
		await TestList.create(mocksData)
		process.exit(0)
	} catch(e) {
		console.log(e)
		process.exit(1)
	}
}

populate()