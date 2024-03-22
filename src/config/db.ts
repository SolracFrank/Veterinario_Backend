import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { NullUriException } from '../errors/NullUriException.js'
dotenv.config()
const uri = process.env.MONGO_URI

const connectDb = async () => {
	try {
		if (!uri) {
			throw new NullUriException(
				'Not URI Provided from environment vars (MongoDB)',
				500
			)
		}
		const db = await mongoose.connect(uri, {})
		const url = `${db.connection.host}:${db.connection.port}`
		console.log('Mongo DB is listening at ', url)
	} catch (error) {
		if (error instanceof NullUriException) {
			const newError = error as NullUriException
			console.log(`${newError.status ?? ''}${newError.message}`)
		} else {
			const newError = error as { message: string }
			console.log(`${newError.message}`)
		}
		process.exit(1)
	}
}
export default connectDb
