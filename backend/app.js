import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {db} from './config/db.js';
import userRouter from './routes/userRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

//dotenv config to use environment variables
dotenv.config();

//connet to the database
db()

const app = express();

//middlewares
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to parse the incoming request with JSON payloads
app.use(express.urlencoded({ extended: true })); //to parse the incoming request with urlencoded payloads and extended: true allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true)

// Register User Routes
app.use("/api/v1/user",userRouter)

// Register Error Handler Middleware, has to be registered after all the routes
// app.use(errorHandler);


export default app;