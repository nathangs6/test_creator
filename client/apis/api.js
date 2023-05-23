import axios from 'axios';
const BASE_URL = 'http://localhost:3001/api';


export default axios.create({
    baseURL: BASE_URL 
});

export const APIPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
