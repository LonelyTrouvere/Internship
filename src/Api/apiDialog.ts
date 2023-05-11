import axios, { InternalAxiosRequestConfig } from 'axios'
import UserType from '../Types/FormData'

const client = axios.create({
    baseURL: 'http://3.75.186.163/',
    timeout: 2000,
    headers: {
        'Accept': 'application/json'
    }
});

client.interceptors.request.use((
    requsest:InternalAxiosRequestConfig<any>)=>{
        const token = localStorage.getItem('access_token');
        if (token !== null)
            requsest.headers.Authorization = `Bearer ${token}`;
        return requsest;
});

export const apiStatus = async () => {
    const res = await client.get("").then(response => response.data);
    return res;
} 

export const createUser = async (user:UserType) => {
   const res = await client.post("user/", {
    user_password: user.pass, 
    user_password_repeat: user.repPass,
    user_email:user.email,
    user_firstname: user.firstName,
    user_lastname: user.lastName,
    })
    .then(response => {return response.data});
   return res;
}

export const authUser = async (user:UserType) => {
    const res = await client.post("auth/login/", {
        user_email: user.email,
        user_password: user.pass,
    })
    .then(response => response.data);
    return res;
}

export const authMe = async () => {
    const res = await client.get("auth/me").then(response => response.data);
    return res;
}

export const getAllUsers = async (page:number, entrie: number) => {
    const res = await client.get("users", {params:{page:page, page_size:entrie}}).then(response => response.data.result);
    return res;
}