// src/index.js
import express from 'express';
import router from './router/index.js';
import dotenv from 'dotenv';
import connectDb from '../config/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
//CONN  DB
connectDb();
//MIDDLEWARES
//ROUTING
app.use('/', router);
//LISTENER
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port} `);
});
