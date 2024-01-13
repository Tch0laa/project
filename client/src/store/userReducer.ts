import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApiInstance from '../utils/axiosInstance';
import apiRoutes from '../api/api';
import { User } from '../types/auth';
import { UserInitialState } from '../types/users';


const initialState: UserInitialState = {
    usersLoading: false,
    users: []
}

export const getAllUsers= createAsyncThunk('users/get-all-users',async(_, thunkApi)=>{
    try{
    const response = await axiosApiInstance.get<User[]>(apiRoutes.users.get);
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder=>{
        builder.addCase(getAllUsers.pending,state=>{
            state.usersLoading=true;
        });
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.usersLoading=false;
            state.users= action.payload;
        });
        builder.addCase(getAllUsers.rejected,state=>{
            state.usersLoading = false;
        })
    }
})

export default userSlice.reducer;