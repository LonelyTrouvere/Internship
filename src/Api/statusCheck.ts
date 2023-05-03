import axios from 'axios'

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