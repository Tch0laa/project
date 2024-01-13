import mongoose from "mongoose";

export interface IProduct {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating:{
        rate: number;
        count: number;
    }
    quantity: number;
    isInStock: boolean;
}


const schema = new mongoose.Schema<IProduct>({
    title: {type: String, required: true },
    category: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    isInStock: {type:Boolean, requiredd: true, default: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 100},
    rating: {
        rate: {
            type: Number, required: true,
        },
        count: {
            type: Number, required: true
        }
    }
})

export default mongoose.model('Product', schema);