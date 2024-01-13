import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const store = configureStore({
    reducer:{
        auth: authReducer,
        users: userReducer,
        products: productReducer,
        cart: cartReducer
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false})
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector;
export const useAppDispatch: ()=>AppDispatch = useDispatch;

export default store;