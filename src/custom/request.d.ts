import { Express } from 'express'

declare global {
	namespace Express {
		interface Request {
			data?: any
		}
	}
}
