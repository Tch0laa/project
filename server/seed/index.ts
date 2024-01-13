import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Product from '../src/models/Product';
import connectDb from '../src/config/dbConnect';
dotenv.config();

connectDb();

async function seedProducts() {
    try{
    const response = await axios.get('https://fakestoreapi.com/products');
    await Product.insertMany(response.data);
    console.log('Product seeded')
    }catch(err) {
        console.log('Error seeding the products')
    }
}

seedProducts()