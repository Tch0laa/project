import mongoose from 'mongoose';
import { IProduct } from './Product';


export interface ICart {
    userId: string;
    cartItems: (IProduct & {quantity: number})[];
}


const schema = new mongoose.Schema<ICart>({
    userId : {type: String, required: true, unique: true},
    cartItems: [{type: mongoose.Schema.Types.Mixed, required: true, default: []}],
},{timestamps: true})

export default mongoose.model('Cart', schema);