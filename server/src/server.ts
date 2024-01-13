import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDb from './config/dbConnect';

const PORT = process.env.PORT || 7000;
const NODE_ENV = process.env.NODE_ENV || 'development';


const server = http.createServer(app);

server.listen(PORT,()=>{
    connectDb();
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
})