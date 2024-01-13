import express from 'express';
import cors from 'cors';
import {v2 as cloudinary} from 'cloudinary';

import apiRouter from './routes/api';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}))
app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


// dont show that it's express
app.disable('x-powered-by');

app.use('/api/v1',apiRouter);

app.use(errorHandler);

export default app;