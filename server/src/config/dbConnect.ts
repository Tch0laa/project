import mongoose from 'mongoose';


const connectDb=async()=>{
    try{
    mongoose.connect(process.env.MONGO_URI!);
    console.log('Mongo connected successfully');
    }catch(err) {
        console.log('Error connecting to the database');
    }
}

export default connectDb;