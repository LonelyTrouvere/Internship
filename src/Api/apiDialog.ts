import axios from 'axios'
import UserType from '../Types/FormData'

const client = axios.create({
    baseURL: 'http://3.75.186.163/',
    timeout: 1000,
    headers: {
        'Accept': 'application/json'
    }
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

export const authMe = async (token:string) => {
    const res = await client.get("auth/me",{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.data);
    return res;
}