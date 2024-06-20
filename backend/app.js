import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {db} from './config/db.js';
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';

//dotenv config to use environment variables
dotenv.config();

//connet to the database 
db()

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true })); //to parse the incoming request with urlencoded payloads and extended: true allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true)
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to parse the incoming request with JSON payloads

// Register User Routes
app.use("/api/v1/user",userRouter)


app.all('*', (req, res, next) => {
    let err = new Error(`Page not found ${req.originalUrl}!`);
    err.status(404);
    next(err);
});


// Register Error Handler Middleware, has to be registered after all the routes
app.use(globalErrorHandler);


export default app;