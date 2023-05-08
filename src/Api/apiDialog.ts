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
   const res = await client.post("user/", JSON.stringify({
    user_password: user.pass, 
    user_password_repeat: user.repPass,
    user_email:user.email,
    user_firstname: user.firstName,
    user_lastname: user.lastName,
    }))
    .then(response => {console.log(response); return response.data});
   return res;
}