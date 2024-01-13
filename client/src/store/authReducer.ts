import  {createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { AuthInitialState, RegisterValues, LoginValues, User } from '../types/auth';
import axiosApiInstance from '../utils/axiosInstance';
import apiRoutes from '../api/api';
import { message } from 'antd';
import { UserBody } from '../types/users';

const initialState: AuthInitialState = {
  registerLoading: false,
  loginLoading: false,
  authedUser: JSON.parse(localStorage.getItem('authedUser') as string) || null,
  updateUserLoading: false,
  profilePictureLoading: false

};

export const registerUser = createAsyncThunk('auth/register-user', async({values, onSuccess}:{values: RegisterValues, onSuccess: (message: string)=>void}, thunkApi)=>{
    try{
    const response = await axiosApiInstance.post<{message: string}>(apiRoutes.auth.register,values);
    onSuccess && onSuccess(response.data.message);
    }catch(err:any) {
        message.error(err.response.data.message);
        return thunkApi.rejectWithValue(err);
    }
});

export const loginUser = createAsyncThunk('auth/login-user',async({values,onSuccess}:{values: LoginValues,onSuccess:VoidFunction}, tnunkApi)=>{
    try{
    const response = await axiosApiInstance.post<{user: User, cart: any}>(apiRoutes.auth.login,values);
    onSuccess && onSuccess()
    return response.data;
    }catch(err:any) {
        message.error(err.response.data.message);
        return tnunkApi.rejectWithValue(err);
    }
})

export const updateUser = createAsyncThunk('auth/update-user',async({values,onSuccess}:{values: UserBody, onSuccess: (message: string)=>void}, thunkApi)=>{
    try{
    const response = await axiosApiInstance.put<{message: string,data: UserBody}>(apiRoutes.auth.updateUser,values);
    onSuccess && onSuccess(response.data.message);
    }catch(err: any) {
        message.error(err.response.data?.message);
        return thunkApi.rejectWithValue(err);
    }
});

export const updateProfilePicture = createAsyncThunk('auth/update-profile',async({image, onSuccess}:{image: any, onSuccess: (msg: string)=>void}, thunkApi)=>{
    try{
    const response = await axiosApiInstance.put<{message: string, data: string}>(apiRoutes.auth.updateProfile,{image});
    onSuccess && onSuccess(response.data.message);
    return response.data.data;
    }catch(err: any) {
        message.error(err.response.data?.message);
        return thunkApi.rejectWithValue(err);
    }
})

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout(state) {
            state.authedUser = null;
            localStorage.removeItem('authedUser');
            localStorage.removeItem('accessToken');
        }
    },
    extraReducers: builder=>{
        builder.addCase(registerUser.pending,state=>{
            state.registerLoading = true;
        });
        builder.addCase(registerUser.fulfilled, state=>{
            state.registerLoading = false;
        });
        builder.addCase(registerUser.rejected,state=>{
            state.registerLoading = false;
        });
        builder.addCase(loginUser.pending,state=>{
            state.loginLoading = true;
        });
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loginLoading = false;
            state.authedUser = action.payload.user;
            localStorage.setItem('cart', JSON.stringify(action.payload.cart));
        });
        builder.addCase(loginUser.rejected,state=>{
            state.loginLoading = false;
        });
        builder.addCase(updateUser.pending,state=>{
            state.updateUserLoading = true;
        });
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.updateUserLoading = false;
            state.authedUser = {id: state.authedUser?.id as string, ...action.payload as any};
            localStorage.setItem('authedUser', JSON.stringify(state.authedUser));
        });
        builder.addCase(updateUser.rejected,state=>{
            state.updateUserLoading = false;
        });
        builder.addCase(updateProfilePicture.pending,state=>{
            state.profilePictureLoading = true;
        });
        builder.addCase(updateProfilePicture.fulfilled,(state, action)=>{
            state.profilePictureLoading = false;
            state.authedUser= {...state.authedUser,img: action.payload as string } as any;
            localStorage.setItem('authedUser', JSON.stringify(state.authedUser));
        });
        builder.addCase(updateProfilePicture.rejected,state=>{
            state.profilePictureLoading = false;
        })

    }

})

export const { logout } = authReducer.actions;

export default authReducer.reducer;