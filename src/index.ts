// src/index.js
import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import router from './router/index.js'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import veterinarioRoutes from './router/veterinarioRoutes.js'
import pacientesRoutes from './router/pacientesRoutes.js'
import cors, { CorsOptions } from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001
const allowedDomains = process.env.FRONT_URLS?.split(',') ?? ''

//CORS
const corsOptions: CorsOptions =
{
	origin: function(origin:string | undefined, callback: (err:Error | null, allow:boolean)=>void)
	{
		console.log('Executing cors policy for ',origin)
		
		if(!origin || allowedDomains.indexOf(origin)!== -1)
		{
		console.log('CORS policy passed ',origin)
			
			return callback(null,true)
		}
		return callback(new Error('Not Allowed origin'),false)

	},
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
//CONN  DB
connectDb()
//MIDDLEWARES

//Logging
app.use(
	morgan(
		'HTTP VERB= :method  ENDPOINT= :url STATUS CODE= :status  TIME= :response-time ms DATE= :date[iso]'
	)
)

//GET DATA FROM REQUEST BODY
app.use(express.json())

//ROUTING
app.use('/', router)
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacientesRoutes)

//Error Global

//LISTENER
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port} `)
})
