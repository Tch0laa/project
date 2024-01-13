import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { CartInitialState } from '../types/cart';
import axiosApiInstance from '../utils/axiosInstance';
import apiRoutes from '../api/api';

const initialState: CartInitialState = {
    cartItems: JSON.parse(localStorage.getItem('cart') as string ?? '[]').cartItems || [],
    cartInfo: JSON.parse(localStorage.getItem('cart') as string ?? '{}') || null
}

export const addToCart = createAsyncThunk('cart/add',async({product, onSuccess}: {product: Product, onSuccess: (message: string)=>void}, thunkApi)=>{
    try{
    const response= await axiosApiInstance.put<{message: string, status: string}>(apiRoutes.cart.add, {product});
    onSuccess && onSuccess(response.data.message);
    return response.data;

    }catch(err) {
    return thunkApi.rejectWithValue(err);
    }
})

export const incrementItem= createAsyncThunk('cart/increment',async({product}: {product: Product}, thunkApi)=>{
   try{
    const response = await axiosApiInstance.put<{status: string}>(apiRoutes.cart.increment,{product});
    return response.data;
   }catch(err) {
    return thunkApi.rejectWithValue(err);
   }
})

export const decrementItem = createAsyncThunk('cart/decrement',async({product}:{product: Product},thunkApi)=>{
    try{
    const response = await axiosApiInstance.put<{status: string}>(apiRoutes.cart.decrement,{product});
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

const cartReducer = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers: builder=>{
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            if(action.payload.status==='ok') {
                const product = action.meta.arg.product;
                if(state.cartItems.find(item=>item._id===product._id.toString())) {
                    state.cartItems = state.cartItems.map(item=>item._id===product._id? {...item, quantity: item.quantity+1}: item)
                }else{
                    state.cartItems = [...state.cartItems, {...action.meta.arg.product, quantity: 1}]
                }
                localStorage.setItem('cart', JSON.stringify({...state.cartInfo, cartItems: state.cartItems}));
            }
        });
        builder.addCase(incrementItem.fulfilled,(state,action)=>{
            if(action.payload.status==='ok') {
                const product = action.meta.arg.product;
                state.cartItems = state.cartItems.map(item=>item._id===product._id.toString()? {...item,quantity: item.quantity+1}: item);
                localStorage.setItem('cart', JSON.stringify({...state.cartInfo, cartItems: state.cartItems}));
            }
        });
        builder.addCase(decrementItem.fulfilled,(state,action)=>{
            if(action.payload.status==='ok') {
                const product = action.meta.arg.product;
                state.cartItems = state.cartItems.map(item=>item._id===product._id.toString()? {...item, quantity: item.quantity-1}: item);
                localStorage.setItem('cart', JSON.stringify({...state.cartInfo, cartItems: state.cartItems}));
            }
        })
    }
})

export default cartReducer.reducer;