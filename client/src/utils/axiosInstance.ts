import axios from 'axios';
import apiRoutes from '../api/api';
import { User } from '../types/auth';

const axiosApiInstance = axios.create({
    baseURL: 'http://localhost:7000/api/v1',
});


export default axiosApiInstance;

axiosApiInstance.interceptors.request.use((request)=>{
    const at = localStorage.getItem('accessToken');
    if(request.url!==apiRoutes.auth.login || request.url!==apiRoutes.auth.register) {
        request.headers.set('Authorization',`Bearer ${at}`);
    }
    return request;
},error=>{
    return Promise.reject(error);
})

axiosApiInstance.interceptors.response.use((response)=>{
    if(response.config.url===apiRoutes.auth.login) {
        const { accessToken, user } = response.data as {accessToken: string, user: User};
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('authedUser', JSON.stringify(user));
    }
    return response;
},error=>{
    return Promise.reject(error);
})