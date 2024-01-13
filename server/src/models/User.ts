import mongoose from 'mongoose'


const schema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email:{type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['ADMIN','PRODUCT_OWNER','BUYER'],default:'BUYER'},
  img: {type: String, required: false}
});

export const User = mongoose.model('User',schema);
export type User = ReturnType<(typeof User)['hydrate']>;

