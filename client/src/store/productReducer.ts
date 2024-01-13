import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiRoutes from '../api/api';
import { Product, ProductInitialState } from '../types/product';
import axiosApiInstance from '../utils/axiosInstance';

const initialState: ProductInitialState = {
    popularProducts: null,
    hotsaleProducts: null,
    recentProducts: null,
    productLoading: false,
    currentProduct: null,
    searchedProducts: [],
    searchLoading: false
}

export const getRecentProducts = createAsyncThunk('product/recent', async(_, thunkApi)=>{
    try{
    const response = await axiosApiInstance.get<Product[]>(apiRoutes.products.recent);
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const getHotsaleProducts = createAsyncThunk('product/hotsale', async(_,thunkApi)=>{
    try{
    const response = await axiosApiInstance.get<Product[]>(apiRoutes.products.hotsales);
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

export const getPopularProducts = createAsyncThunk('product/popular', async(_, thunkApi)=>{
    try{
    const response = await axiosApiInstance.get<Product[]>(apiRoutes.products.popular);
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

export const getSingleProduct = createAsyncThunk('product/single',async(productId: string, thunkApi)=>{
    try{
    const response = await axiosApiInstance.get<Product>(`${apiRoutes.products.get}/${productId}`);
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

export const searchProduct = createAsyncThunk('product/search',async(search: string, thunkApi)=>{
    try{
    const response = await axiosApiInstance.get<Product[]>(`${apiRoutes.products.search}?search=${search}`);
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})


const productReducer = createSlice({
    name:'product',
    initialState,
    reducers: {},
    extraReducers: builder=>{
        builder.addCase(getRecentProducts.fulfilled,(state, action)=>{
            state.recentProducts = action.payload;
        });
        builder.addCase(getHotsaleProducts.fulfilled,(state,action)=>{
            state.hotsaleProducts = action.payload;
        });
        builder.addCase(getPopularProducts.fulfilled,(state,action)=>{
            state.popularProducts = action.payload;
        });
        builder.addCase(getSingleProduct.pending,state=>{
            state.productLoading = true;
        });
        builder.addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.productLoading = false;
            state.currentProduct = action.payload;
        });
        builder.addCase(getSingleProduct.rejected,(state)=>{
            state.productLoading = false;
        });
        builder.addCase(searchProduct.pending,state=>{
            state.searchLoading= true;
        });
        builder.addCase(searchProduct.fulfilled,(state,action)=>{
            state.searchLoading = false;
            state.searchedProducts = action.payload;
        });
        builder.addCase(searchProduct.rejected,(state)=>{
            state.searchLoading = false;
        })

    }
})

export default productReducer.reducer;